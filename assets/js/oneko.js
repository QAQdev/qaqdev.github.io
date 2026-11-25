/**
 * oneko.js — Adapted from https://github.com/adryd325/oneko.js
 * Loads automatically by default and stays anchored to the configured latest paper.
 * Toggleable via #oneko-toggle.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'site-oneko';
  var NEKO_SPEED = 10;
  var PAW_STEP_DISTANCE = 22;
  var PAW_LIFETIME_MS = 3300;
  /* Anatomically shaped feline paw: 4 oval toes in asymmetric arc + trilobed palm pad */
  var PAW_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<ellipse cx="5.2" cy="11.2" rx="2.0" ry="2.7" transform="rotate(-24 5.2 11.2)"/>' +
    '<ellipse cx="9.6" cy="7.2" rx="2.05" ry="2.9" transform="rotate(-8 9.6 7.2)"/>' +
    '<ellipse cx="14.6" cy="7.4" rx="2.05" ry="2.9" transform="rotate(9 14.6 7.4)"/>' +
    '<ellipse cx="18.9" cy="11.5" rx="1.95" ry="2.65" transform="rotate(24 18.9 11.5)"/>' +
    '<path d="M12 11.4c2.1 0 3.5 1.7 4.4 3.4.8 1.5.7 3.2-.5 4.0-1.1.7-2.2.1-3.1-.3-.5-.2-1.1-.2-1.6 0-.9.4-2.0 1.0-3.1.3-1.2-.8-1.3-2.5-.5-4.0.9-1.7 2.3-3.4 4.4-3.4z"/>' +
    '</svg>';

  var SPRITES = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]]
  };

  var nekoEl = null;
  var intervalId = null;
  var isRunning = false;
  var activePaws = [];

  function clearAllPaws() {
    while (activePaws.length) {
      var entry = activePaws.pop();
      clearTimeout(entry.timer);
      if (entry.el && entry.el.parentNode) {
        entry.el.parentNode.removeChild(entry.el);
      }
    }
  }

  function spawnPaw(x, y, vx, vy, side) {
    var len = Math.sqrt(vx * vx + vy * vy) || 1;
    var ux = vx / len;
    var uy = vy / len;
    var nx = -uy;
    var ny = ux;

    /* Subtle organic gait offsets: narrow feline track + micro jitter */
    var viewW = document.documentElement.clientWidth || window.innerWidth;
    var lateral = side * (3.6 + (Math.random() - 0.5) * 1.4);
    var behind = -6 + (Math.random() - 0.5) * 2.4;
    var rawDocX = x + window.scrollX + ux * behind + nx * lateral;
    var docX = Math.max(12, Math.min(viewW - 12, rawDocX));
    var docY = y + window.scrollY + 10 + uy * behind + ny * lateral;

    /* Natural direction + slight toe-out splay + small angle & scale variance */
    var baseAngle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
    var jitterAngle = side * 4 + (Math.random() - 0.5) * 10;
    var scale = 0.92 + Math.random() * 0.16;
    var peakOpacity = 0.34 + Math.random() * 0.13;

    var paw = document.createElement('span');
    paw.className = 'oneko-paw';
    paw.setAttribute('aria-hidden', 'true');
    paw.innerHTML = PAW_SVG;
    paw.style.left = docX.toFixed(1) + 'px';
    paw.style.top = docY.toFixed(1) + 'px';
    paw.style.setProperty('--paw-peak', peakOpacity.toFixed(2));
    paw.style.setProperty('--paw-mid', (peakOpacity * 0.72).toFixed(2));
    paw.style.transform =
      'rotate(' + (baseAngle + jitterAngle).toFixed(1) + 'deg) ' +
      'scaleX(' + (side * scale).toFixed(2) + ') ' +
      'scaleY(' + scale.toFixed(2) + ')';
    document.body.appendChild(paw);

    var entry = { el: paw, timer: null };
    entry.timer = setTimeout(function () {
      if (paw.parentNode) paw.parentNode.removeChild(paw);
      var idx = activePaws.indexOf(entry);
      if (idx !== -1) activePaws.splice(idx, 1);
    }, PAW_LIFETIME_MS);
    activePaws.push(entry);
  }

  function syncToggleUI(active) {
    var btn = document.getElementById('oneko-toggle');
    if (!btn) return;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.setAttribute('title', active ? 'Hide oneko companion' : 'Summon oneko companion');
  }

  function stopOneko() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    clearAllPaws();
    if (nekoEl && nekoEl.parentNode) {
      nekoEl.parentNode.removeChild(nekoEl);
    }
    nekoEl = null;
    isRunning = false;
    syncToggleUI(false);
  }

  function startOneko() {
    if (isRunning) return;

    var reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      syncToggleUI(false);
      return;
    }

    var pinEl = document.getElementById('pin') || document.querySelector('.masthead__brand');
    var pinRect = pinEl ? pinEl.getBoundingClientRect() : { left: 48, width: 120, bottom: 56 };
    var targetId = document.body.getAttribute('data-oneko-target') || 'llada-image';
    var spriteUrl = document.body.getAttribute('data-oneko-sprite') || '/images/oneko.gif';

    var nekoPosX = Math.max(24, Math.min(window.innerWidth - 24, pinRect.left + pinRect.width * 0.5));
    var nekoPosY = Math.max(24, pinRect.bottom + 14);
    var targetPosX = nekoPosX;
    var targetPosY = nekoPosY;

    function updateLatestWorkTarget() {
      var targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      var viewW = document.documentElement.clientWidth || window.innerWidth;
      var rect = targetEl.getBoundingClientRect();
      targetPosX = Math.max(24, Math.min(viewW - 24, rect.left + rect.width * 0.5));
      targetPosY = Math.max(24, Math.min(window.innerHeight - 24, rect.top + 8));
    }

    updateLatestWorkTarget();

    var frameCount = 0;
    var idleTime = 0;
    var idleAnimation = null;
    var idleAnimationFrame = 0;
    var distSinceLastPaw = 0;
    var pawSide = 1;

    nekoEl = document.createElement('div');
    nekoEl.id = 'oneko';
    nekoEl.setAttribute('aria-hidden', 'true');
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = 'fixed';
    nekoEl.style.pointerEvents = 'none';
    nekoEl.style.backgroundImage = 'url("' + spriteUrl + '")';
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = nekoPosX - 16 + 'px';
    nekoEl.style.top = nekoPosY - 16 + 'px';
    nekoEl.style.zIndex = '900';
    document.body.appendChild(nekoEl);

    function setSprite(name, frame) {
      var list = SPRITES[name] || SPRITES.idle;
      var sprite = list[frame % list.length];
      nekoEl.style.backgroundPosition = sprite[0] * 32 + 'px ' + sprite[1] * 32 + 'px';
    }

    function resetIdle() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
        var choices = ['sleeping', 'scratchSelf'];
        if (nekoPosX < 32) choices.push('scratchWallW');
        if (nekoPosY < 32) choices.push('scratchWallN');
        if (nekoPosX > window.innerWidth - 32) choices.push('scratchWallE');
        if (nekoPosY > window.innerHeight - 32) choices.push('scratchWallS');
        idleAnimation = choices[Math.floor(Math.random() * choices.length)];
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0);
          } else {
            setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
          }
          if (idleAnimationFrame > 192) resetIdle();
          break;
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdle();
          break;
        default:
          setSprite('idle', 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function tick() {
      frameCount += 1;
      updateLatestWorkTarget();

      var diffX = nekoPosX - targetPosX;
      var diffY = nekoPosY - targetPosY;
      var distance = Math.sqrt(diffX * diffX + diffY * diffY);

      if (distance < NEKO_SPEED || distance < 48) {
        idle();
        return;
      }

      resetIdle();
      if (idleTime > 1) {
        setSprite('alert', 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      var direction = '';
      if (diffY / distance > 0.5) direction += 'N';
      else if (diffY / distance < -0.5) direction += 'S';
      if (diffX / distance > 0.5) direction += 'W';
      else if (diffX / distance < -0.5) direction += 'E';
      setSprite(direction, frameCount);

      var prevX = nekoPosX;
      var prevY = nekoPosY;
      var vx = -(diffX / distance) * NEKO_SPEED;
      var vy = -(diffY / distance) * NEKO_SPEED;

      var viewW = document.documentElement.clientWidth || window.innerWidth;
      nekoPosX += vx;
      nekoPosY += vy;
      nekoPosX = Math.min(Math.max(16, nekoPosX), viewW - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      var moved = Math.sqrt(
        (nekoPosX - prevX) * (nekoPosX - prevX) + (nekoPosY - prevY) * (nekoPosY - prevY)
      );
      distSinceLastPaw += moved;
      if (distSinceLastPaw >= PAW_STEP_DISTANCE) {
        spawnPaw(prevX, prevY, vx, vy, pawSide);
        pawSide = -pawSide;
        distSinceLastPaw = 0;
      }

      nekoEl.style.left = nekoPosX - 16 + 'px';
      nekoEl.style.top = nekoPosY - 16 + 'px';
    }

    setSprite('idle', 0);
    intervalId = setInterval(tick, 100);
    isRunning = true;
    syncToggleUI(true);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('oneko-toggle');
    var pref = null;
    try {
      pref = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    if (pref !== 'off') {
      startOneko();
    } else {
      syncToggleUI(false);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (isRunning) {
          stopOneko();
          try {
            localStorage.setItem(STORAGE_KEY, 'off');
          } catch (e) {}
        } else {
          try {
            localStorage.setItem(STORAGE_KEY, 'on');
          } catch (e) {}
          startOneko();
        }
      });
    }
  });
})();

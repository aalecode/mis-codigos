(function() {
      const openBtn = document.getElementById('openLetterBtn');
      const closedContent = document.getElementById('closedContent');
      const openedContent = document.getElementById('openedContent');
      const envelope = document.getElementById('envelopeContainer');

      let isOpen = false; // estado inicial: cerrado

      // Función para abrir la carta (cambia clases y estilos)
      function openLetter() {
        if (isOpen) return; // si ya está abierto, no hacer nada

        // Ocultar el contenido del sobre cerrado
        closedContent.style.display = 'none';
        // Mostrar el contenido de la carta abierta (con animación)
        openedContent.classList.add('show');

        // Cambiar estilo del sobre para que parezca abierto (más plano, sin solapa tan marcada)
        envelope.style.background = 'linear-gradient(145deg, #b71c1c, #8b0000)';
        envelope.style.boxShadow = '0 15px 20px -5px rgba(0,0,0,0.6), 0 0 0 3px #ffb74d, 0 0 0 6px #c62828';
        
        // Modificar pseudo-elemento vía estilo en línea no es fácil, así que agregamos una clase extra si se quiere modificar.
        // Pero podemos cambiar el contenido del after (opcional) mediante un data attribute o estilo directo.
        // Para mantener la estética, aplicamos un estilo alternativo con una clase.
        envelope.classList.add('opened');

        // Deshabilitar el botón
        openBtn.disabled = true;
        openBtn.style.opacity = '0.7';
        openBtn.innerHTML = `💖 ¡Abierta! 💖`;

        isOpen = true;

        // Pequeño detalle: agregar más corazones (opcional)
        createFloatingHearts();
      }

      // Función para crear corazones flotantes extra al abrir
      function createFloatingHearts() {
        for (let i = 0; i < 8; i++) {
          const heart = document.createElement('span');
          heart.innerHTML = '❤️';
          heart.style.position = 'fixed';
          heart.style.left = Math.random() * 100 + '%';
          heart.style.top = Math.random() * 100 + '%';
          heart.style.fontSize = (Math.random() * 3 + 1) + 'rem';
          heart.style.opacity = '0.7';
          heart.style.pointerEvents = 'none';
          heart.style.zIndex = '1000';
          heart.style.animation = `floatHeart ${Math.random() * 3 + 2}s ease-out forwards`;
          document.body.appendChild(heart);

          // Eliminar después de la animación
          setTimeout(() => {
            heart.remove();
          }, 4000);
        }
      }

      // Añadir keyframes para corazones flotantes si no existen (en style dinámico)
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(-150px) rotate(20deg); opacity: 0; }
        }
      `;
      document.head.appendChild(styleSheet);

      // Evento click en el botón
      openBtn.addEventListener('click', openLetter);

      // También se puede abrir haciendo click en el sobre (opcional)
      envelope.addEventListener('click', (e) => {
        // Para evitar abrir dos veces si se hace click en el botón y se propaga
        if (e.target.tagName !== 'BUTTON' && !openBtn.disabled) {
          openLetter();
        }
      });

      // Inicialmente aseguramos que openedContent no tenga la clase show si por algún motivo está.
      openedContent.classList.remove('show');
      closedContent.style.display = 'flex'; // aseguramos visible
    })();
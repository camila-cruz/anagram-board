formAnagrama.addEventListener('submit', (e) => {
    e.preventDefault();
    let palavra = document.getElementById('txtPalavra').value;
    
    // Tira os espaços em branco da palavra
    palavra = palavra.replace(/\s/g, '');

    // Tabuleiro com as letras
    let board = document.querySelector('.palavra');

    // Tabuleiro que vai receber as letras
    let boardDrop = document.querySelector('.dropzones');
    
    // Remove a palavra anterior
    while (board.firstChild && boardDrop.firstChild) {
        board.removeChild(board.firstChild);
        boardDrop.removeChild(boardDrop.firstChild);
    }
    
    // Coloca as novas letras e quantos espaços forem necessários
    for (let letra of palavra) {
        let divDrop = document.createElement('div');
        divDrop.classList.add('dropzone');

        let divLetra = document.createElement('div');
        divLetra.setAttribute('draggable', true);
        divLetra.classList.add('letras');
        divLetra.innerHTML = letra.toUpperCase();

        divDrop.appendChild(divLetra);
        board.appendChild(divDrop);

        let divDropzone = document.createElement('div');
        divDropzone.classList.add('dropzone');
        boardDrop.appendChild(divDropzone);
    }

    let letras = document.querySelectorAll('.letras');
    let dropzones = document.querySelectorAll('.dropzone');
    let ultimoDropzone = null, penultimoDropzone = null;

    letras.forEach(letra => {
        letra.addEventListener('dragstart', dragstart);
        letra.addEventListener('dragend', dragend);
    });

    function dragstart() {
        dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
        this.classList.add('is-dragging');

        if (ultimoDropzone) { 
            penultimoDropzone = ultimoDropzone;
        }
        ultimoDropzone = this.parentElement;
    }

    function dragend() {
        dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));

        this.classList.remove('is-dragging');
    }

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragover);
        dropzone.addEventListener('dragleave', dragleave);
        dropzone.addEventListener('drop', drop);
    });

    function dragover() {
        this.classList.add('over');

        // Pega a letra que tá selecionada
        const letraSelecionada = document.querySelector('.is-dragging');
        const letraAtual = this.firstChild;
        
        if (letraAtual) {
            ultimoDropzone.appendChild(letraAtual);
        }
        this.appendChild(letraSelecionada);
    }

    function dragleave() {
        console.log("Deixou a zona");
        this.classList.remove('over');

        if (penultimoDropzone && penultimoDropzone.firstChild) {
            penultimoDropzone.appendChild(ultimoDropzone.lastChild);
            ultimoDropzone = penultimoDropzone;
        }
    }

    function drop() {
        ultimoDropzone = null;
        penultimoDropzone = null;
    }
});
const questions = [
    {
        text: "É COM ESSA PARTE DO CORPO QUE NÓS CONSEGUIMOS IR PRA LÁ E PRA CÁ. DÁ PRA ESTICAR, DOBRAR E ATÉ CRUZAR. QUAL PARTE DO CORPO É ESSA?",
        options: ["BRAÇO", "PERNA", "PESCOÇO"],
        correct: 1, 
        img: "img/pernas.png" 
    },
    {
        text: "NESSA PARTE DO CORPO É LEGAL DE VER COMO SOMOS DIFERENTES. NELA, CARREGAMOS O NOSSO CABELO DO JEITINHO QUE ELE É, NOSSOS OLHOS DE TODAS AS CORES, ALÉM DA ORELHA E DO NARIZ QUE É SÓ NOSSO. QUAL PARTE DO CORPO É ESSA?",
        options: ["JOELHO", "MÃO", "CABEÇA"],
        correct: 2,
        img: "img/cabeca.png"
    },

    {
        text: "ESSA É A PARTE DO CORPO QUE SE DOBRA PARA A GENTE DAR UM ABRAÇO APERTADO E É ELA QUE LIGA NOSSA MÃO AO RESTINHO DO BRAÇO. QUAL PARTE DO CORPO É ESSA?",
        options: ["CABEÇA", "COTOVELO", "PESCOÇO"],
        correct: 1,
        img: "img/cotovelo.png"
    },

    {
        text: "PODE FICAR ABERTA OU FECHADA, PODE DAR OI E DAR TCHAU. COM ELA PODEMOS ESCREVER, SEGURAR UM OBJETO E ATÉ FAZER CARINHO NO NOSSO PET. QUAL PARTE DO CORPO É ESSA?",
        options: ["PESCOÇO", "ORELHA", "MÃO"],
        correct: 2,
        img: "img/mao.png"
    },

    {
        text: "ESSA É A PARTE QUE LIGA OS NOSSOS BRAÇOS AO TRONCO. POR CAUSA DELA PODEMOS MEXER OS BRAÇOS PRA TODO LADO NA HORA DE DANÇAR E ATÉ CARREGAR A MOCHILA NA HORA DE IR PRA ESCOLA. QUAL PARTE DO CORPO É ESSA?",
        options: ["CABEÇA", "OMBRO", "PESCOÇO"],
        correct: 1,
        img: "img/ombro.png"
    },
];

const quiz = {
    currentQuestion: 0,

    start() {
        document.getElementById('screen-start').classList.remove('active');
        document.getElementById('screen-quiz').classList.add('active');
        this.renderQuestion();
    },

    renderQuestion() {
        const q = questions[this.currentQuestion];
        document.getElementById('question-text').innerText = q.text;
        const imageContainer = document.getElementById('question-image');
        imageContainer.innerHTML = `<img src="${q.img}" alt="Parte do corpo" class="quiz-img">`;
        imageContainer.classList.add('bounce-animation');
        
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.style.animationDelay = (index * 0.15) + "s";
            btn.onclick = () => this.checkAnswer(index);
            container.appendChild(btn);
        });

        // Barra de progresso
    const percent = ((this.currentQuestion) / questions.length) * 100;
    document.getElementById('progress').style.width = percent + "%";
    },

   checkAnswer(index) {
    const isCorrect = index === questions[this.currentQuestion].correct;
    const modalContent = document.querySelector('.modal-content');
    const txt = document.getElementById('feedback-text');
    const btnNext = document.getElementById('btn-next');
    
    modalContent.classList.remove('success', 'error');

    if(isCorrect) {
        modalContent.classList.add('success');
        txt.innerHTML = `
            <div style="font-size: 3rem; animation: bounceIn 0.5s">🌟</div>
            <span class="feedback-title success-text">RESPOSTA CORRETA!</span><br>
            PARABÉNS PELO EMPENHO!
        `;
        btnNext.innerText = "PRÓXIMA PERGUNTA";
        btnNext.style.backgroundColor = "var(--green)";
    } else {
        modalContent.classList.add('error');
        txt.innerHTML = `
            <div style="font-size: 3rem;">🧐</div>
            <span class="feedback-title error-text">HMM, NÃO É BEM ISSO!</span><br>
            QUE TAL REVISAR E TENTAR DE NOVO?
        `;
        btnNext.innerText = "TENTAR DE NOVO";
        btnNext.style.backgroundColor = "#ff8800";
    }
    
    document.getElementById('modal-feedback').classList.add('active');
    this.lastResult = isCorrect;
},

next() {
    // 1. Fecha o modal de feedback sempre
    document.getElementById('modal-feedback').classList.remove('active');
    
    // 2. Só prossegue se o aluno acertou
    if(this.lastResult) {
        this.currentQuestion++;

        // Verifica se ainda existem perguntas no array
        if(this.currentQuestion < questions.length) {
            this.renderQuestion();
        } else {
            // FIM DO JOGO: Troca as telas
            document.getElementById('screen-quiz').classList.remove('active');
            document.getElementById('screen-end').classList.add('active');
            
            // 3. EFEITO DOS CONFETES 
            var duration = 3 * 1000;
            var end = Date.now() + duration;

            (function frame() {
                // Lança confetes da esquerda (x: 0)
                confetti({ 
                    particleCount: 3, 
                    angle: 60, 
                    spread: 55, 
                    origin: { x: 0 }, 
                    colors: ['#6c2a8c', '#82bc00', '#ff8800', '#84CFDF'] 
                });
                // Lança confetes da direita (x: 1)
                confetti({ 
                    particleCount: 3, 
                    angle: 120, 
                    spread: 55, 
                    origin: { x: 1 }, 
                    colors: ['#6c2a8c', '#82bc00', '#ff8800', '#84CFDF'] 
                });

                // Se ainda não deu 3 segundos, continua chamando o próximo frame
                if (Date.now() < end) { 
                    requestAnimationFrame(frame); 
                }
            }()); 
        }
    }
}
}
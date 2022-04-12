(function(){
    // funções
    function buildQuiz(){
      // variável para guardar os dados que saem do html
      const output = [];
  
      // para cada questão
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variável para guardar as possível respostas
          const answers = [];
  
          // para cada resposta avaliavel
          for(letter in currentQuestion.answers){
  
            // adicionando botões tipo radio
            answers.push(
              `<label class="caixa">
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                <span class="checkmark"> </span>
              </label>`
            );
          }
  
          // adicionar as questões e suas respostas para a saída
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // Combina a lista de saída em uma string ( caractere ) do Html e coloca na página
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // Guarda as box de respostas do quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // Localazizar as respostas do usuário
      let numCorrect = 0;
  
      // para cada questão
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // encontrar a resposta selecionada pelo usuário
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // se a resposta é correta :
        if(userAnswer === currentQuestion.correctAnswer){
          // adiciona ao números de respostas acertadas
          numCorrect++;
  
          // colorir os acertos de verde
          answerContainers[questionNumber].style.color = 'lightgreen';
          
        }
        // se a resposta for errada
        else{
          // colorir as erradas de vermelho
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // mostrar o número de acerto com base no total
      
      if (numCorrect >= 8){
        msgContainer.innerHTML=`Parabéns ! você prestou atenção enquanto lia o livro`
        resultsContainer.innerHTML = ` Você acertou ${numCorrect} de ${myQuestions.length}`
      }
      else{
        msgContainer.innerHTML=`Talvez, você deva ler o livro novamente`
        resultsContainer.innerHTML = ` Você acertou ${numCorrect} de ${myQuestions.length}`
      }
    }
    // transição das perguntas
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        iniciarButton.style.display = 'inline-block';
        previousButton.style.display = 'none';
        quizContainer.style.display = 'none';
        nextButton.style.display = 'none';
        quizBox.style.display = 'none';
        resetButton.style.display ='none';
      }
      else{
        iniciarButton.style.display = 'none';
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        quizContainer.style.display = 'inline-block';
        quizBox.style.display = 'inherit';
        homeButton.style.display ='none';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';
        homeButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none'
      }
      
    }
    function startSlide() {
      showSlide(currentSlide + 1);
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
    
    
    // Variáveis
    const quizBox = document.getElementById('quizbox')
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const msgContainer = document.getElementById('msg');
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');
    // perguntas
    const myQuestions = [
      {
        question: "Quem é o Protagonista?",
        answers: {
          a: "Winston",
          b: "Julia",
          c: "Grande Irmão"
        },
        correctAnswer: "a"
      },
      {
        question: "Onde Winston trabalha?",
        answers: {
          a: "Ministério da Paz",
          b: "Ministério da Abundância",
          c: "Ministério da Verdade",
        },
        correctAnswer: "c"
      },
      {
        question: "Onde a narrativa acontece?",
        answers: {
          a: "Lestásia",
          b: "em Londres, na Oceania",
          c: "Eurosásia",
        },
        correctAnswer: "b"
      },
      {
        question: "Qual o principal inimigo do Partido?",
        answers: {
          a: "Winston",
          b: "Goldstein",
          c: "O'Brien",
        },
        correctAnswer: "b"
      },
      {
        question: "Quem é o líder do Partido?",
        answers: {
          a: "Sr. Charrington",
          b: "O'Brien",
          c: "Grande Irmão",
        },
        correctAnswer: "c"
      },
      {
        question: "Em que ano acontece a narrativa?",
          answers: {
            a: "1984",
            b: "1945",
            c: "1986",
          },
          correctAnswer: "a"
      },
      {
        question: "Qual o nome do objeto que sempre observava os personagens dentro de suas casas?",
          answers: {
            a: "Polícia do Pensamento",
            b: "Teletela",
            c: "câmera",
          },
          correctAnswer: "b"
      },
      {
        question: "Qual o maior medo de Winston?",
          answers: {
            a: "Ratos",
            b: "Barata",
            c: "Falar Dormindo",
          },
          correctAnswer: "a"
      },
      {
        question: "Quem era um policial disfarçado?",
          answers: {
            a: "Julia",
            b: "Syme",
            c: "Sr. Charrington",
          },
          correctAnswer: "c"
      },
      {
        question: "No final Winston : ",
          answers: {
            a: "Odeia o Partido",
            b: "Ama o Partido",
            c: "Morre",
          },
          correctAnswer: "b"
      },
    ];
  
    // cria o quizz
    buildQuiz();

    // Paginação - voltar, próxima, inciar, reiniciar, home
    const homeButton = document.getElementById('home');
    const iniciarButton = document.getElementById('iniciar');
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // mostrar a primeira transição
    showSlide(currentSlide);
  
    // Lista de eventos
    //enviar e mostrar os resultados
    submitButton.addEventListener("click", showResults);
    //voltar a pergunta
    previousButton.addEventListener("click", showPreviousSlide);
    //avançar a pergunta
    nextButton.addEventListener("click", showNextSlide);
    //iniciar o quiz
    iniciarButton.addEventListener("click", startSlide);
    // reset
  })();
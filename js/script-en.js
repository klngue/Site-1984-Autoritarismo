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
        msgContainer.innerHTML=`Congratulations! You paid attention while reading the book`
        resultsContainer.innerHTML = ` Your  Score is : ${numCorrect} of ${myQuestions.length}`
      }
      else{
        msgContainer.innerHTML=`Maybe, you should read the book again`
        resultsContainer.innerHTML = ` Your  Score is : ${numCorrect} of ${myQuestions.length}`
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
        question: "Who is the Protagonist?",
        answers: {
          a: "Winston",
          b: "Julia",
          c: "Big Brother"
        },
        correctAnswer: "a"
      },
      {
        question: "Where does Winston work?",
        answers: {
          to: "Ministry of Peace",
          b: "Ministry of Abundance",
          c: "Ministry of Truth",
        },
        correctAnswer: "c"
      },
      {
        question: "Where does the narrative take place?",
        answers: {
          a: "Lestasia",
          b: "in London, in Oceania",
          c: "Eurasia",
        },
        correctAnswer: "b"
      },
      {
        question: "What is the main enemy of the Party?",
        answers: {
          a: "Winston",
          b: "Goldstein",
          c: "O'Brien",
        },
        correctAnswer: "b"
      },
      {
        question: "Who is the leader of the Party?",
        answers: {
          to: "Mr. Charrington",
          b: "O'Brien",
          c: "Big Brother",
        },
        correctAnswer: "c"
      },
      {
        question: "What year does the narrative take place?",
          answers: {
            to: "1984",
            b: "1945",
            c: "1986",
          },
          correctAnswer: "a"
      },
      {
       question: "What is the name of the object that always observed the characters inside their houses?",
          answers: {
            a: "Thought Police",
            b: "Telescreen",
            c: "camera",
          },
          correctAnswer: "b"
      },
      {
        question: "What is Winston's biggest fear?",
          answers: {
            a: "Rats",
            b: "Cheap",
            c: "Talk in your sleep",
          },
          correctAnswer: "a"
      },
      {
        question: "Who was an undercover cop?",
          answers: {
            a: "Julia",
            b: "Syme",
            c: "Mr. Charrington",
          },
          correctAnswer: "c"
      },
      {
        question: "In the end Winston : ",
          answers: {
            a: "Hates the Party",
            b: "Love the Party",
            c: "Die",
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
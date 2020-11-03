'use strict';

{


  document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      {
        name: 'ruri1',
        img: 'images/ruri1.jpg'
      },
      {
        name: 'ruri1',
        img: 'images/ruri1.jpg'
      },
      {
        name: 'ruri2',
        img: 'images/ruri2.jpg'
      },
      {
        name: 'ruri2',
        img: 'images/ruri2.jpg'
      },
      {
        name: 'ruri3',
        img: 'images/ruri3.jpg'
      },
      {
        name: 'ruri3',
        img: 'images/ruri3.jpg'
      },
      {
        name: 'ruri4',
        img: 'images/ruri4.jpg'
      },
      {
        name: 'ruri4',
        img: 'images/ruri4.jpg'
      },
      {
        name: 'ruri5',
        img: 'images/ruri5.jpg'
      },
      {
        name: 'ruri5',
        img: 'images/ruri5.jpg'
      },
      {
        name: 'ruri6',
        img: 'images/ruri6.jpg'
      },
      {
        name: 'ruri6',
        img: 'images/ruri6.jpg'
      },
      {
        name: 'ruri7',
        img: 'images/ruri7.jpg'
      },
      {
        name: 'ruri7',
        img: 'images/ruri7.jpg'
      },
      {
        name: 'ruri8',
        img: 'images/ruri8.jpg'
      },
      {
        name: 'ruri8',
        img: 'images/ruri8.jpg'
      },
      {
        name: 'ruri9',
        img: 'images/ruri9.jpg'
      },
      {
        name: 'ruri9',
        img: 'images/ruri9.jpg'
      },
      {
        name: 'ruri10',
        img: 'images/ruri10.jpg'
      },
      {
        name: 'ruri10',
        img: 'images/ruri10.jpg'
      }

    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    const cardsWon = [];
    let cardA;
    let cardB;
    let previousCardsWonLengthCount = 0;

    const close = document.getElementById('close');
    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');
    const message = document.getElementById('message');

    const timer = document.getElementById('timer');
    let startTime;
    let timeoutId;
    let timerStartNum = 0;

    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', 'images/click.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      }
    }

    //check for matches
    function checkForMatch() {
      var cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      cardA = cards[optionOneId];
      cardB = cards[optionTwoId];

      if (optionOneId == optionTwoId) {
        console.log(cardA);
        console.log(cardB);
        modalMsg('連打はアカン！');
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        modalMsg('よう見つけたな！');
        cardA.removeEventListener('click', flipCard);
        cardB.removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        modalMsg('ちゃうで！');
      }

      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = `${cardsWon.length} / ${cardArray.length / 2} `;
      if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'コンプリート！';
        clearTimeout(timeoutId);
      }
    }

    //flip your card
    function flipCard() {
      timerStartNum++;
      if (timerStartNum === 1) {
        startTime = Date.now();
        countUp();
      }
      var cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      this.classList.add('ura');

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 700);
      }
    }

    function countUp() {
      const d = new Date(Date.now() - startTime);
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const ms = String(d.getMilliseconds()).padStart(3, '0');
      timer.textContent = `${m}分${s}.${ms}秒`;
      timeoutId = setTimeout(() => {
        countUp();
      }, 10);
    }

    function turnItOver(varCardA, varCardB) {
      varCardA.classList.remove('ura');
      varCardB.classList.remove('ura');
      varCardA.setAttribute('src', 'images/click.png');
      varCardB.setAttribute('src', 'images/click.png');
    }


    function modalMsg(msg) {
      mask.classList.remove('hidden');
      modal.classList.remove('hidden');
      message.textContent = msg;
    }

    close.addEventListener('click', () => {
      mask.classList.add('hidden');
      modal.classList.add('hidden');
      if (cardsWon.length === previousCardsWonLengthCount + 1) {
        previousCardsWonLengthCount++;
      } else {
        turnItOver(cardA, cardB);
      }
    });

    mask.addEventListener('click', () => {
      close.click();
    });

    createBoard();

  })


}

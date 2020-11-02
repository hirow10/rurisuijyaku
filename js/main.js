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

    let startTime;
    let timeoutId;
    let timerStartNum = 0;

    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', 'images/click.png');
        card.setAttribute('data-id', i);
        // card.classList.add('omote')
        card.addEventListener('click', flipCard);
        // setTimeout(card.addEventListener('click', flipCard), 300);
        grid.appendChild(card);
      }
    }

    //check for matches
    function checkForMatch() {
      var cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/click.png');
        cards[optionTwoId].setAttribute('src', 'images/click.png');
        setTimeout(alert('連打はアカン！'), 200);
        cards[optionOneId].classList.remove('ura');
        cards[optionTwoId].classList.remove('ura');
        // alert('連打はアカン！');
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        alert(`よう見つけたな！ `);
        // alert(`よう見つけたな！ ${cardArray[optionOneId].name}`)
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        cards[optionOneId].setAttribute('src', 'images/click.png');
        cards[optionTwoId].setAttribute('src', 'images/click.png');
        setTimeout(alert('ちゃうで！'), 200);
        cards[optionOneId].classList.remove('ura');
        cards[optionTwoId].classList.remove('ura');
        // alert('ちゃうで！');
      }
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = `${cardsWon.length} / ${cardArray.length / 2} `;
      // resultDisplay.textContent = cardsWon.length;
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
      // this.width = 100px
      // this.height = orgHeight * (this.width / orgWidth)
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      this.classList.add('ura');
      // console.log('ura');
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 600);
      }
    }

    function countUp() {
      const d = new Date(Date.now() - startTime);
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const ms = String(d.getMilliseconds()).padStart(3, '0');
      // timer.textContent = `${m}分${s}秒`;
      timer.textContent = `${m}分${s}.${ms}秒`;
      timeoutId = setTimeout(() => {
        countUp();
      }, 10);
    }





    createBoard()
  })







}

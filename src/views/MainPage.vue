<template>
    <div id="slider-container">
        <div class="slider-images">
            <img class="slider-image" src="../assets/1-1.jpg" alt="Image 1">
            <img class="slider-image" src="../assets/1-2.jpg" alt="Image 2">
            <img class="slider-image" src="../assets/1-3.jpg" alt="Image 3">
            <img class="slider-image" src="../assets/1-4.jpg" alt="Image 4">
            <!-- Add more images as needed -->
            </div>
            </div>

            <div class="dot-container" id="dotContainer"></div>


            <div class="new_">

            <div class="one">

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>

                <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
                </div>
            </div>

            <div class="one">

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>

            <div class="goods">
                <img class="goods p" src="../assets/2-1.png" alt="사진없쪙">
                <a class="goodsname" href="http://naver.com/">낚싯대</a><br>
                <a class="s price" href="http://naver.com/">2조원</a><br>
                <a class="b price" href="http://naver.com/">2.5조원</a>
            </div>
        </div>
    </div>
</template>
<!-- <script type="application/javascript">
  let currentIndex = 0;
  const totalSlides = document.querySelectorAll('.slider-image').length;
  const sliderImages = document.querySelector('.slider-images');
  const dotContainer = document.getElementById('dotContainer');


  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dotContainer.appendChild(dot);
    dot.addEventListener('click', () => showSlide(i));
  }

  const allDots = document.querySelectorAll('.dot');
  allDots[0].classList.add('active-dot');


  function showSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }

    const translateValue = -currentIndex * 100 + '%';
    sliderImages.style.transform = 'translateX(' + translateValue + ')';
    updateDots();
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // Automatic slide change every 3 seconds
  setInterval(nextSlide, 3000);

  // Update active dot based on the current index
  function updateDots() {
    allDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  }
</script> -->
<style scoped>
#slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 400px; /* Adjust the width as needed */
  margin: auto;
  align-content: center;
}

.slider-images {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-image {
  width: 100%;
  flex: 0 0 auto;
  size: contain;
}

#prevBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
}

#nextBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
}


#prevBtn { left: 10px; }
#nextBtn { right: 10px; }

.dot-container {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 150px;
}

.dot {
  height: 7px;
  width: 7px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.active-dot {
  background-color: #717171;
}


.new_ {
  position: relative;
  width: 100%;
  height: 500px;
  margin: auto;
  align-content: center;

}

.one {
  position: relative;
  background-position: center;
  display: flex;
  justify-content: center;
  margin: 0 0 0 0;
  align-content: center;
}

.p {
  width: 150px;
  height: 150px;
}

.goods {
  position: relative;
  display: grid;
  align-content: center;
  margin: auto;
  place-items: center;
}    


</style>

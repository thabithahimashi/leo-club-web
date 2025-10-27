document.addEventListener('DOMContentLoaded', function() {
    const words = ['leadership', 'experience', 'opportunity'];
    const letters = ['L', 'E', 'O'];
    let currentIndex = 0;
    const leo = document.getElementById('leo');
    const container = document.querySelector('.animation-container');
    const containerRect = container.getBoundingClientRect();
    
    // Final corner positions (not too close to edge)
    const cornerPositions = [
        { top: '20%', left: '75%' },  // L position
        { top: '25%', left: '80%' },  // E position
        { top: '30%', left: '85%' }   // O position
    ];
    
    function startAnimation() {
        if (currentIndex >= words.length) {
            // All letters extracted, now form LEO
            formLeo();
            return;
        }
        
        const currentWord = document.getElementById(words[currentIndex]);
        const currentLetter = document.querySelector(`.${letters[currentIndex]}`);
        
        // Show the full word
        currentWord.style.opacity = 1;
        
        setTimeout(() => {
            // Hide the word but keep the first letter visible
            currentWord.style.opacity = 0;
            
            // Position the extracted letter where the word was
            const wordRect = currentWord.getBoundingClientRect();
            currentLetter.style.top = `${wordRect.top + wordRect.height/2}px`;
            currentLetter.style.left = `${wordRect.left + currentWord.offsetWidth/2}px`;
            currentLetter.style.opacity = 1;
            currentLetter.style.transform = 'translate(-50%, -50%)';
            currentLetter.style.fontSize = window.innerWidth < 768 ? '3rem' : '6rem';
            
            // Move letter to corner position
            setTimeout(() => {
                currentLetter.style.top = cornerPositions[currentIndex].top;
                currentLetter.style.left = cornerPositions[currentIndex].left;
                currentLetter.style.fontSize = window.innerWidth < 768 ? '2.5rem' : '4rem';
            }, 800);
            
            currentIndex++;
            
            // Next word after delay
            setTimeout(startAnimation, 2000);
        }, 1500);
    }
    
    function formLeo() {
        // Move all letters to center to form LEO
        letters.forEach((letter, index) => {
            const el = document.querySelector(`.${letter}`);
            el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            el.style.top = '50%';
            el.style.left = `${30 + index * 20}%`;
            el.style.fontSize = window.innerWidth < 768 ? '3rem' : '6rem';
        });
        
        // After letters are in position, hide them and show LEO
        setTimeout(() => {
            document.querySelectorAll('.letter').forEach(el => {
                el.style.opacity = 0;
            });
            
            // Show and animate LEO
            leo.style.opacity = 1;
            leo.classList.add('grow-in');
            leo.classList.add('pulse');
            
            // After showing LEO, reset animation
            setTimeout(() => {
                leo.classList.remove('pulse');
                leo.classList.add('fade-out');
                
                setTimeout(() => {
                    // Reset all elements
                    document.querySelectorAll('.word').forEach(word => {
                        word.style.opacity = 0;
                    });
                    
                    document.querySelectorAll('.letter').forEach(letter => {
                        letter.style.opacity = 0;
                        letter.style.transition = 'all 1s ease';
                        letter.style.fontSize = window.innerWidth < 768 ? '3rem' : '6rem';
                    });
                    
                    leo.style.opacity = 0;
                    leo.classList.remove('fade-out', 'grow-in');
                    leo.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    
                    currentIndex = 0;
                    
                    // Restart animation
                    setTimeout(startAnimation, 500);
                }, 1000);
            }, 2500);
        }, 1000);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (currentIndex > 0 && currentIndex < words.length) {
            const currentLetter = document.querySelector(`.${letters[currentIndex-1]}`);
            currentLetter.style.left = cornerPositions[currentIndex-1].left;
            currentLetter.style.top = cornerPositions[currentIndex-1].top;
        }
    });
    
    // Start the animation
    startAnimation();
});
Full-Screen Background
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background: linear-gradient(158deg, #1A237E, #6193eb);
    position: relative;
    overflow: hidden; /* Prevents scrollbars */
}

/* Moving Clouds */
.cloud {
    position: absolute;
    width: 150px;
    height: auto;
    opacity: 0.2;
    animation: moveClouds 20s linear infinite;
}

/* Cloud Positions */
.cloud1 {
    top: 10%;
    left: -200px;
    animation-delay: 0s;
}
.cloud2 {
    top: 30%;
    left: -300px;
    animation-delay: 5s;
}
.cloud3 {
    top: 50%;
    left: -250px;
    animation-delay: 10s;
}

/* Moon Icon */
.moon {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, #d9d9d9, #b0b0b0);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(217, 217, 217, 0.5);
    animation: glowMoon 3s infinite alternate;
}

/* Falling Stars */
.star {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: fallingStars 5s linear infinite;
}

/* Randomized Star Positions */
.star1 { top: 10%; left: 20%; animation-delay: 0s; }
.star2 { top: 30%; left: 50%; animation-delay: 2s; }
.star3 { top: 60%; left: 80%; animation-delay: 4s; }

/* Animations */
@keyframes moveClouds {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(110vw);
    }
}

/* Moon Glow Effect */
@keyframes glowMoon {
    0% {
        box-shadow: 0 0 10px rgba(217, 217, 217, 0.5);
    }
    100% {
        box-shadow: 0 0 20px rgba(217, 217, 217, 0.8);
    }
}

@keyframes fallingStars {
    from {
        transform: translateY(0);
        opacity: 0.8;
    }
    to {
        transform: translateY(50vh);
        opacity: 0;
    }
}

/* Snowflakes / Hail */
.snowflake {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: snowfall linear infinite;
}

/* Randomized Snowflakes */
.snow1 { top: -10%; left: 10%; animation-duration: 5s; }
.snow2 { top: -10%; left: 30%; animation-duration: 6s; }
.snow3 { top: -10%; left: 50%; animation-duration: 4.5s; }
.snow4 { top: -10%; left: 70%; animation-duration: 7s; }
.snow5 { top: -10%; left: 90%; animation-duration: 5.5s; }

/* Falling Animation */
@keyframes snowfall {
    from {
        transform: translateY(0);
        opacity: 0.8;
    }
    to {
        transform: translateY(100vh);
        opacity: 0;
    }
}
/* Main Container */
.main-container {
    position: relative;
    height: 450px;
    width: 895px;
    gap: 25px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
    opacity: 0.95;
    z-index: 2;
}

/* Left and Right Sections */
.left, .right {
    height: 400px;
    width: 410px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    color: white;
    font-size: 22px;
    font-weight: bold;
}

/* Left Box */
.left {
    background: linear-gradient(135deg, #ff4b2b, #ff416c);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Right Box */
.right {
    background: linear-gradient(135deg, #16222a, #3a6073);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* Input Fields */
textarea {
    width: 320px;
    height: 30px;
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    resize: none;
    outline: none;
    transition: all 0.3s ease-in-out;
}

textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

textarea:focus {
    border-color: #ffcb24;
    background-color: rgba(255, 255, 255, 0.3);
}

/* Animated Login Button */
button {
    width: 200px;
    height: 40px;
    background: linear-gradient(135deg, #ffcc33, #ff9933);
    color: #000;
    border: none;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 15px rgba(255, 153, 51, 0.4);
}

button:hover {
    background: linear-gradient(135deg, #ff9933, #ffcc33);
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(255, 153, 51, 0.6);
}

button:active {
    transform: scale(0.98);
}
/* Styling for buttons */
.right-lower {
    display: flex;
    justify-content: space-between;
    width: 320px;
    margin-top: 10px;
    gap: 25px;
}

.right-lower button {
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: linear-gradient(135deg, #ddb848, #ff9933);
    color: black;
    box-shadow: 0 5px 10px rgba(255, 153, 51, 0.4);
}

.right-lower button:hover {
    background: linear-gradient(135deg, #ff9933, #ffcc33);
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(255, 153, 51, 0.6);
}

.right-lower button:active {
    transform: scale(0.95);
} 

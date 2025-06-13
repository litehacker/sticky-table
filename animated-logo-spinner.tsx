"use client"

import { useState } from "react"

interface AnimatedLogoSpinnerProps {
  size?: number
  duration?: number
  className?: string
}

export default function AnimatedLogoSpinner({ size = 136, duration = 2.5, className = "" }: AnimatedLogoSpinnerProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  // Calculate the circumference of the circle
  const radius = 64.5
  const circumference = 2 * Math.PI * radius

  // Reset animation when needed
  const resetAnimation = () => {
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 50)
  }

  // Generate a unique ID for the gradient
  const gradientId = "circleGradient"

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Define the gradient */}
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="68" y1="3.5" x2="68" y2="132.5">
            <stop offset="0%" stopColor="#25BDCC" className="turquoise-stop" />
            <stop offset="100%" stopColor="#F05A28" className="orange-stop" />
          </linearGradient>
        </defs>

        {/* Inner shapes */}
        <path
          d="M85.5181 46.2128C81.2471 36.7134 70.054 33.9888 64.0892 35.3143C63.4501 35.4564 62.8227 35.5198 62.2483 35.6825C57.8299 36.9344 54.5898 38.849 50.8343 43.5618C48.2488 46.8064 47.2643 51.0413 47.1523 54.4604C47.0824 56.6047 47.4005 58.378 47.7414 59.5415C48.6251 62.5606 51.1656 68.7095 59.7814 76.3679L67.4766 83.1795L77.5651 74.1956C77.5651 74.1956 82.9408 68.1572 84.7081 64.9907C86.4754 61.8243 89.7892 55.7122 85.5181 46.2128ZM74.6741 60.1674L67.4045 53.7652L60.0759 60.1674L59.1923 58.621C57.6458 55.97 58.3086 53.6872 58.3086 53.6872C60.1496 45.9551 67.2557 46.0383 67.2557 46.0383C73.7727 46.0479 75.9083 51.6989 75.9083 51.6989C78.0438 56.2645 74.6741 60.1674 74.6741 60.1674Z"
          fill="#F05A28"
        />
        <path
          d="M66.9489 67.722C61.7783 63.0688 59.9316 59.819 59.9316 59.819L67.2444 53.3193C67.2444 53.3193 78.3155 62.41 81.7961 67.3527C84.0431 70.5435 86.3174 73.8361 87.1883 77.6931C88.2224 82.2724 87.336 88.9937 82.7563 94.4593C82.7563 94.4593 77.8073 101.107 68.2046 101.624C59.1176 102.113 50.4028 95.641 48.0391 87.8119C47.3374 85.4875 46.9511 83.1122 47.005 81.0906C47.132 76.3031 48.9994 72.449 52.2377 68.1652C52.2377 68.1652 56.9533 73.5857 59.9479 76.3496C60.0705 76.4626 58.602 78.4317 58.4543 79.5396C58.4181 79.8136 57.1306 82.5642 59.8577 86.7779C61.4828 89.2891 64.419 90.4354 66.7273 90.5447C66.7273 90.5447 70.7161 90.8402 73.4492 88.1812C76.1822 85.5222 76.9947 82.3463 76.3299 79.7612C75.6651 77.1761 72.1196 73.0399 72.1196 73.0399L69.5342 70.1594L66.9489 67.722Z"
          fill="#25BDCC"
        />

        {/* Animated circle */}
        {isAnimating && (
          <circle
            cx="68"
            cy="68"
            r={radius}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            className="animated-circle"
            stroke={`url(#${gradientId})`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
              animation: `fillCircle ${duration}s ease-in-out forwards`,
            }}
          />
        )}
      </svg>

      <style jsx>{`
        @keyframes fillCircle {
          0% {
            stroke-dashoffset: ${circumference};
            stroke-opacity: 0;
          }
          20% {
            stroke-opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-opacity: 1;
          }
        }
        
        .animated-circle {
          transform-origin: center;
          transform: rotate(-90deg);
        }
        
        @keyframes gradientAnimation {
          0% {
            stop-color: #25BDCC;
          }
          100% {
            stop-color: #F05A28;
          }
        }
        
        .turquoise-stop {
          animation: none;
        }
        
        .orange-stop {
          animation: gradientAnimation ${duration * 0.6}s ease-in-out ${duration * 0.4}s forwards;
          stop-color: #25BDCC;
        }
      `}</style>
    </div>
  )
}

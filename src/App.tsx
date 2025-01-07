import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Button } from 'antd'

function App() {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState({})
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (!buttonRef.current) return
    const buttonRect = buttonRef.current.getBoundingClientRect()
    setTooltipStyle({
      top: `${buttonRect.top + window.scrollY - 55}px`,
      left: `${buttonRect.left + buttonRect.width / 2}px`,
      transform: 'translateX(-50%)'
    })
    setTooltipVisible(!tooltipVisible)
  }

  const handleScroll = () => {
    if (tooltipVisible && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      setTooltipStyle({
        top: `${buttonRect.top + window.scrollY - 55}px`,
        left: `${buttonRect.left + buttonRect.width / 2}px`,
        transform: 'translateX(-50%)',
      });
    }
  }

  // click the blank container to close tooltip
  const handleClickOutside = (e: MouseEvent) => {
    if (
      tooltipRef.current && buttonRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setTooltipVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tooltipVisible]);

  return (
    <>
      <div className='content'>
        <p>
          Hello world!
        </p>
        <Button
          ref={buttonRef}
          type='link'
          onClick={handleButtonClick}
        >
          Tooltip
        </Button>
        {
          tooltipVisible && (
            <div ref={tooltipRef} className="custom-tooltip" style={tooltipStyle}>
              This is Tooltip hover content
            </div>
          )
        }
      </div>
    </>
  )
}

export default App

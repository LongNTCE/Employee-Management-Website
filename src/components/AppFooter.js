import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div> */}
      <div className="ms-auto">
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2024 </span>
        <a href="https://github.com/cuongnp3110" target="_blank" rel="noopener noreferrer">
          cuongnp3110
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

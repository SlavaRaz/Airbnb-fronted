import { useSelector } from 'react-redux'

export function PageFooter() {
  const count = useSelector((storeState) => storeState.userModule.count)

  return (
    <footer className='page-footer full main-container'>
        <div className='footer-container'>
          <div className='footer-left'>
          <div className='copyrights'>
            <span>&copy; 2025 Slava, Shani, Odeya, Inc </span></div>
            <div>
            <span className='dot'>·</span>
            <span>Terms</span>
            <span className='dot'>·</span>
            <span>Sitemap</span>
            <span className='dot'>·</span>
            <span>Privacy</span>
            <span className='dot'>·</span>
            <span>Your Privacy Choices</span></div>
          </div>

          <div className='footer-right'>
            <div className='language'>English(US)</div>
            <div className='currency'>USD</div>
            <div className='support'>Support & Resources</div>
          </div>
        </div>
    </footer>
  )
}

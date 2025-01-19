import { useSelector } from 'react-redux'

export function AppFooter() {
  const count = useSelector((storeState) => storeState.userModule.count)

  return (
    <footer className='app-footer full'>
      <div className='footer-container'>
        <div className='footer-left'>
          <span>&copy; 2025 Coffeerights, Inc </span>
          <span className='dot'>·</span>
          <span>Terms</span>
          <span className='dot'>·</span>
          <span>Sitemap</span>
          <span className='dot'>·</span>
          <span>Privacy</span>
          <span className='dot'>·</span>
          <span>Your Privacy Choices</span>
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

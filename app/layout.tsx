import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'XENIX Polymer Calculator — คำนวณ Polymer PUBG',
  description: 'เครื่องมือ XENIX สำหรับคำนวณ Polymer อัปเกรดปืน PUBG พร้อมเปรียบเทียบราคาจาก Steam Market',
  keywords: 'XENIX, PUBG, Polymer, Calculator, Weapon Upgrade, Steam Market, PUBG Thailand',
  openGraph: {
    title: 'XENIX Polymer Calculator',
    description: 'คำนวณ Polymer อัปเกรดปืน PUBG พร้อมราคา Steam Market',
    type: 'website',
  },
}

const navLink = {
  color: '#a2a6b3',
  fontSize: '13px',
  fontWeight: 600,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
} as const

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{margin:0,padding:0,background:'#111217',color:'#f5f4f0',minHeight:'100vh',fontFamily:'Inter, Noto Sans Thai, system-ui, sans-serif'}}>
        <nav style={{background:'#17181f',borderBottom:'1px solid #2b2d36',padding:'14px 4%',minHeight:'72px',display:'flex',alignItems:'center',gap:'28px',position:'sticky',top:0,zIndex:100,boxSizing:'border-box',flexWrap:'wrap'}}>
          <a href="https://xenix-shop-web.vercel.app/#cdk" style={{color:'#f5f4f0',fontSize:'25px',fontWeight:950,letterSpacing:'-1px',lineHeight:1,textDecoration:'none'}}>
            XENIX
          </a>
          <div style={{display:'flex',alignItems:'center',gap:'22px',flex:1,flexWrap:'wrap'}}>
            <a href="https://xenix-shop-web.vercel.app/#cdk" style={navLink}>CODE SKIN</a>
            <a href="https://xenix-shop-web.vercel.app/#daily" style={navLink}>BONUS</a>
            <a href="https://xenix-shop-web.vercel.app/polymer" style={{...navLink,color:'#efc45b'}}>คำนวณ Polymer</a>
          </div>
          <a href="https://steamcommunity.com/market/search?appid=578080" target="_blank" rel="noopener noreferrer" style={{fontSize:'12px',color:'#efc45b',textDecoration:'none',padding:'7px 13px',border:'1px solid #625338',borderRadius:'7px'}}>Steam Market ↗</a>
        </nav>

        <div style={{background:'#17181f',borderBottom:'1px solid #2b2d36',padding:'8px 20px',textAlign:'center'}}>
          <div style={{maxWidth:'728px',margin:'0 auto'}}>
            <a href="https://www.facebook.com/MyBoo147" target="_blank" rel="noopener noreferrer">
              <img src="/myboo-banner.jpg" alt="MyBoo PUBG PC Buy and Sell" style={{width:'100%',height:'auto',borderRadius:'8px',display:'block'}}/>
            </a>
          </div>
        </div>

        <main>{children}</main>

        <footer style={{background:'#17181f',borderTop:'1px solid #2b2d36',padding:'32px 24px',marginTop:'48px'}}>
          <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'28px'}}>
            <div>
              <div style={{fontWeight:900,fontSize:'19px',color:'#f5f4f0'}}>XENIX <span style={{color:'#efc45b'}}>POLYMER</span></div>
              <div style={{fontSize:'13px',color:'#a2a6b3',maxWidth:'360px',lineHeight:1.7,marginTop:'8px'}}>เครื่องมือคำนวณ Polymer สำหรับอัปเกรดปืน PUBG พร้อมเปรียบเทียบราคา Steam Market</div>
            </div>
            <div style={{display:'flex',gap:'18px',flexWrap:'wrap'}}>
              <a href="https://xenix-shop-web.vercel.app/" style={navLink}>XENIX Home</a>
              <a href="https://xenix-shop-web.vercel.app/#cdk" style={navLink}>CDK Store</a>
              <a href="https://pubg.com" target="_blank" rel="noopener noreferrer" style={navLink}>PUBG Official</a>
            </div>
            <div style={{fontSize:'12px',color:'#777b88',flexBasis:'100%',borderTop:'1px solid #2b2d36',paddingTop:'16px'}}>© 2026 XENIX · ราคาจาก Steam Market อาจมีความล่าช้า · ไม่ได้เป็นส่วนหนึ่งของ Krafton หรือ Steam</div>
          </div>
        </footer>
      </body>
    </html>
  )
}

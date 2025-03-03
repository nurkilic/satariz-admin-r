import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  return (
    <>
      <MenuItem title='İstatistikler' to='/dashboard' />
      <MenuItem title='İlanlar' to='/dashboard' />
      <MenuItem title='Mağazalar' to='/dashboard' />
      <MenuItem title='Faturalar' to='/dashboard' />


      <MenuInnerWithSub
        isMega={true}
        title='Uyarı ve Talepler'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>
    </>
  )
}

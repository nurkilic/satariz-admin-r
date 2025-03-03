
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../helpers'
import {useLayout} from '../../../core'

const MegaMenu: FC = () => {
  const {setLayoutType, setToolbarType} = useLayout()
  return (
    <div className='row'>
      {/* begin:Col */}
      <div className='col-lg-6'>
        {/* begin:Row */}
        <div className='row'>
          {/* begin:Col */}
          <div className='col-lg-6 mb-3'>
            {/* begin:Heading */}
            <h4 className='fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4'>Uyarılar</h4>
            {/* end:Heading */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setLayoutType('light-sidebar')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>EİDS Uyarıları</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setLayoutType('dark-sidebar')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Paket Uyarıları</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setLayoutType('dark-header')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Onay Bekleyen Üyeler</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
          </div>
          {/* end:Col */}
          {/* begin:Col */}
          <div className='col-lg-6 mb-3'>
            {/* begin:Heading */}
            <h4 className='fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4'>Talepler</h4>
            {/* end:Heading */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setToolbarType('classic')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Destek Talepleri</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setToolbarType('saas')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Çağrı Talepleri</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a onClick={() => setToolbarType('accounting')} className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Çağrı Yönetimi</span>
              </a>
              {/* end:Menu link */}
            </div>

          </div>
          {/* end:Col */}
        </div>
      </div>
      {/* end:Col */}
      {/* begin:Col */}
      <div className='col-lg-6 mb-3 py-lg-3 pe-lg-8 d-flex align-items-center'>
        <img src={toAbsoluteUrl('media/illustrations/dozzy-1/6.png')} className='rounded mw-50' alt='' />
      </div>
      {/* end:Col */}
    </div>
  )
}

export {MegaMenu}

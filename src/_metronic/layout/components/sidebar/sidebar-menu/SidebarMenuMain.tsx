import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'


const SidebarMenuMain = () => {
    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={'İstatistikler'}
                fontIcon='bi-app-indicator'
            />
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Sistem Ayarları</span>
                </div>
            </div>
            <SidebarMenuItem to='/settings/general-settings' icon='gear' title='Genel Ayarlar' fontIcon='bi-gear'/>
            <SidebarMenuItem to='/settings/contracts' icon='book' title='Sözleşmeler' fontIcon='bi-file-break'/>
            <SidebarMenuItem to='/categories' icon='burger-menu-2' title='Kategori Yönetimi' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Üye Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItem to='/companies' icon='briefcase' title='Mağazalar' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='profile-user' title='Üyeler' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='user-tick' title='Yetkililer' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='medal-star' title='Temsilciler' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='screen' title='Çağrı Merkezi Çalışanları' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Paket Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItem to='/builder' icon='star' title='Bireysel Üye Paketleri' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='rocket' title='Kurumsal Üye Paketleri' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>İlan Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItem to='/builder' icon='pin' title='İlan Listesi' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='update-file' title='İlan Uyarıları (EİDS)' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Muhasebe Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItem to='/builder' icon='document' title='Faturalar' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='graph-4' title='Gelir-Giderler' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Destek Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItem to='/builder' icon='message-question' title='Destek Talepleri' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='time' title='Çağrı Talepleri' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='phone' title='Çağrı Yönetimi' fontIcon='bi-layers'/>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Bildirim Yönetimi</span>
                </div>
            </div>
            <SidebarMenuItemWithSub
                to='/builder'
                title='Bildirim Yönetimi'
                fontIcon='bi-beel'
                icon='notification-on'
            >
                <SidebarMenuItem to='/builder' title='Bildirim Listesi' hasBullet={true}/>
                <SidebarMenuItem to='/builder' title='Bildirim Gönder' hasBullet={true}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/builder'
                title='SMS Yönetimi'
                fontIcon='bi-beel'
                icon='messages'
            >
                <SidebarMenuItem to='/builder' title='SMS Listesi' hasBullet={true}/>
                <SidebarMenuItem to='/builder' title='SMS Gönder' hasBullet={true}/>
            </SidebarMenuItemWithSub>

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Diğer</span>
                </div>
            </div>
            <SidebarMenuItem to='/builder' icon='questionnaire-tablet' title='Log Kayıtları' fontIcon='bi-layers'/>
            <SidebarMenuItem to='/builder' icon='arrow-left' title='Çıkış Yap' fontIcon='bi-layers'/>

        </>
    )
}

export {SidebarMenuMain}

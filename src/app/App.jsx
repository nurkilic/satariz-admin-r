import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import Loading from '../app/components/Loading.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading, selectLoading } from '../app/redux/slice/LoadingSlice.tsx';
const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
      {loading ? <Loading/> : null}
    </Suspense>
  )
}

export {App}

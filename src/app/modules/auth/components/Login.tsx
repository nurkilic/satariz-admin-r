import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import {useNavigate} from "react-router-dom";
import {setAuthState} from "../../../redux/slice/AuthSlice.tsx";
import {useDispatch} from "react-redux"

const loginSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Telefon numarası yalnızca rakamlardan oluşabilir')
        .length(11, 'Telefon numarası 11 karakter olmalıdır.')
        .required('Telefon numarası zorunludur'),
})

const codeSchema = Yup.object().shape({
    code1: Yup.string()
        .length(1)
        .required(''),
})

const initialValues = {
    phone: '05342380703',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
    const [loading, setLoading] = useState(false)
    const [sendCodeStatus, setSendCodeStatus] = useState(null)
    const [phone, setPhone] = useState(null)
    const [token, setToken] = useState(null)
    const {saveAuth, setCurrentUser} = useAuth()
    const [step, setStep] = useState('phone');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: auth} = await login(values.phone)
                setPhone(values.phone)
                setSendCodeStatus(auth)
                setStep('code')
                console.log(auth)
                setLoading(false)
                //saveAuth(auth)
                //const {data: user} = await getUserByToken(auth.api_token)
                //setCurrentUser(user)
            } catch (error) {
                console.error(error)
                setSendCodeStatus(null)
                dispatch(setAuthState({user: null, token: ''}))
                setStatus(error?.response?.data?.message)
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    const codeFormik = useFormik({
        initialValues: {
            code1: '',
            code2: '',
            code3: '',
            code4: ''
        },
        validationSchema: codeSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const code = values.code1 + values.code2 + values.code3 + values.code4
                const {data: auth} = await getUserByToken(phone, code)
                console.log(auth)
                console.log(auth.data.user)
                console.log(auth.data.token)
                dispatch(setAuthState({user: auth.data.user, token: auth.data.token}))
            } catch (error) {
                console.error(error)
                dispatch(setAuthState({user: null, token: ''}))
                setSendCodeStatus(error?.response?.data)
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    return (
        <div>
            {step === 'phone' && (
                <form
                    className='form w-100'
                    onSubmit={formik.handleSubmit}
                    noValidate
                    id='kt_login_signin_form'
                >
                    {/* begin::Heading */}
                    <div className='text-center mb-11'>
                        <h1 className='text-gray-900 fw-bolder mb-3'>Satarız Yönetim Portalı</h1>
                        <div className='text-gray-500 fw-semibold fs-6'>Giriş Yap</div>
                    </div>
                    {/* begin::Heading */}


                    {formik.status && (
                        <div className='mb-lg-15 alert alert-danger'>
                            <div className='alert-text font-weight-bold'>{formik.status}</div>
                        </div>
                    )}

                    {sendCodeStatus && (
                        <div
                            className={`mb-lg-15 alert ${
                                sendCodeStatus.status === 'success' ? 'alert-success' : 'alert-danger'
                            }`}
                        >
                            <div className="alert-text font-weight-bold">{sendCodeStatus.message}</div>
                        </div>
                    )}

                    <div>
                        {/* begin::Form group */}
                        <div className='fv-row mb-8'>
                            <label className='form-label fs-6 fw-bolder text-gray-900'>Telefon Numaranız</label>
                            <input
                                placeholder='Telefon Numaranız'
                                {...formik.getFieldProps('phone')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    {'is-invalid': formik.touched.phone && formik.errors.phone},
                                    {
                                        'is-valid': formik.touched.phone && !formik.errors.phone,
                                    }
                                )}
                                type='number'
                                name='phone'
                                autoComplete='off'
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.phone}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Form group */}

                        {/* begin::Action */}
                        <div className='d-grid mb-10'>
                            <button
                                type='submit'
                                id='kt_sign_in_submit'
                                className='btn btn-primary'
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                {!loading && <span className='indicator-label'>Devam Et</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{display: 'block'}}>
              Lütfen bekleyin...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                                )}
                            </button>
                        </div>
                    </div>


                </form>
            )}
            {step === 'code' && (
                <form
                    className='form w-100'
                    onSubmit={codeFormik.handleSubmit}
                    noValidate
                    id='kt_login_signin_form'
                >
                    <div>
                        {/* begin::Form group */}
                        <div className="text-center mb-10">
                            <img
                                alt='Logo'
                                src={toAbsoluteUrl('media/svg/misc/smartphone-2.svg')}
                                className='mh-125px'
                            />
                        </div>

                        <div className="text-center mb-10">
                            <h1 className="text-gray-900 mb-3">
                                İki Adımlı Doğrulama
                            </h1>

                            <div className="text-muted fw-semibold fs-5 mb-5">Lütfen numaranıza gönderdiğimiz kodu
                                girin.
                            </div>

                            <div className="fw-bold text-gray-900 fs-3">{phone}</div>
                        </div>
                        {sendCodeStatus && (
                            <div
                                className={`mb-lg-15 alert ${
                                    sendCodeStatus.status === 'success' ? 'alert-success' : 'alert-danger'
                                }`}
                            >
                                <div className="alert-text font-weight-bold">{sendCodeStatus.message}</div>
                            </div>
                        )}
                        {status && (
                            <div
                                className={`mb-lg-15 alert alert-danger`}
                            >
                                <div className="alert-text font-weight-bold">{status}</div>
                            </div>
                        )}
                        <div className="mb-10">
                            <div className="fw-bold text-start text-gray-900 fs-6 mb-1 ms-1">
                                4 Haneli Güvenlik Kodu
                            </div>

                            <div className="d-flex flex-wrap flex-stack">
                                {['code1', 'code2', 'code3', 'code4'].map((codeName, index, array) => (
                                    <input
                                        key={codeName}
                                        {...codeFormik.getFieldProps(codeName)}
                                        className={clsx(
                                            'form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2',
                                        )}
                                        type="text"
                                        name={codeName}
                                        maxLength="1"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            codeFormik.setFieldValue(codeName, value);
                                            if (value.length === 1 && index < array.length - 1) {
                                                // Sonraki inputa geçiş yap
                                                const nextInput = document.querySelector(`input[name='${array[index + 1]}']`);
                                                if (nextInput) nextInput.focus();
                                            }

                                            // Formu submit et
                                            if (array.every(inputName => codeFormik.values[inputName]?.length === 1)) {
                                                if (codeFormik.isValid) {
                                                    codeFormik.submitForm(); // Eğer tüm inputlar dolmuşsa formu submit et
                                                }
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            <div className='d-grid mb-10 mt-10'>
                                <button
                                    type='submit'
                                    id='kt_sign_in_submit'
                                    className='btn btn-primary'
                                    disabled={codeFormik.isSubmitting || !codeFormik.isValid}
                                >
                                    {!loading && <span className='indicator-label'>Devam Et</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{display: 'block'}}>
                  Lütfen bekleyin...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>


                </form>
            )}
        </div>
    )
}

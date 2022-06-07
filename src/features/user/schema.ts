import { object, SchemaOf, string } from 'yup'

import { ProfileUpdateForm } from './ProfilePage'

export const profileUpdateSchema: SchemaOf<ProfileUpdateForm> = object().shape({
    fullName: string().required('validation.full_name_required'),
    description: string().max(255, 'validation.max_length_255').notRequired(),
})

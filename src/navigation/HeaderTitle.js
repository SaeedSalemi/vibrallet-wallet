import React from 'react'
import AppText from '../components/common/AppText'

export default function HeaderTitle({ children, typo = 'md' }) {
	return <AppText typo={typo}>{children}</AppText>
}

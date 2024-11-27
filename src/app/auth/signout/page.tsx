'use client'

import {signOutAction} from "@/features/auth/serverActions";

const SignOut = () => {
	return (
		<div>
			Are you sure to sign out?
			<div>
				<button onClick={signOutAction}>Yes</button>
				<button onClick={() => {
					window.history.back()
				}}>Back</button>
			</div>
		</div>
	)
}

export default SignOut
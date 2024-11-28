'use client'

import { signOutAction } from "@/features/auth/serverActions";
import { Button } from "@/features/shared/ui/button";

const SignOut = () => {
	return (
		<div className="container mx-auto">
			<h2 className="font-bold text-xl">Are you sure to sign out?</h2>
			<div className="flex space-x-1">
				<Button onClick={signOutAction}>Yes</Button>
				<Button onClick={() => {
					window.history.back()
				}}>Back</Button>
			</div>
		</div>
	)
}

export default SignOut
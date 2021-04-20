import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
	return !!session;
}

const generatedPermissions = Object.fromEntries(
	permissionsList.map((p) => [
		p,
		function ({ session }: ListAccessArgs) {
			return !!session?.data.role?.[p];
		},
	])
);

export const permissions = {
	...generatedPermissions,
};

//rules can return a boolean or afilter which limits which products the can CRUD
export const rules = {
	canManageProducts({ session }: ListAccessArgs) {
		//have canManageProducts?
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		//if not, do they own the product?
		return { user: { id: session.itemId } };
	},
	canOrder({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		//have canManageCart?
		if (permissions.canManageCart({ session })) {
			return true;
		}
		//if not, do they own the product?
		return { user: { id: session.itemId } };
	},
	canManageOrderItems({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		//have canManageCart?
		if (permissions.canManageCart({ session })) {
			return true;
		}
		//if not, do they own the product?
		return { order: { user: { id: session.itemId } } };
	},
	canReadProducts({ session }: ListAccessArgs) {
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		return { stauts: 'AVAILABLE' };
	},
   canManageUsers({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		//have canManageUsers?
		if (permissions.canManageUsers({ session })) {
			return true;
		}
		//if not, they may only update themselves
		return { id: session.itemId };
	},
};

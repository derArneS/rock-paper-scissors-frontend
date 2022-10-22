import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user.service";

export function emailAlreadyExistsValidator(userService: UserService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        let user = await userService.readUserByEmail(control.value);
        console.debug('user read by email for validator', user);

        if(user) {
            console.debug('user is true');
            return { forbiddenEmail: { value: control.value } };
        }

        return null;
    };
}
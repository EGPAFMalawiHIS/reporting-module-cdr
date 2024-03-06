import { alertController } from "@ionic/vue";

export interface AlertConfirmationOtions {
  header?: string;
  subHeader?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
}

export async function alertConfirmation (message: string, options?: AlertConfirmationOtions) {
  const alert = await alertController.create({
    header: options?.header ?? "Confirmation",
    subHeader: options?.subHeader,
    cssClass: 'confirmation-alert',
    message,
    buttons: [
      {
        text:  options?.cancelBtnLabel ?? "Cancel",
        role: 'cancel',
        handler: (data) => alertController.dismiss(data)
      },
      {
        text: options?.confirmBtnLabel ?? "Confirm",
        handler: (data) => alertController.dismiss(data)
      }
    ],
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();
  return role !== "cancel";
}
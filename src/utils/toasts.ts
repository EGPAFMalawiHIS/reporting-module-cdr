import { toastController } from "@ionic/vue";

/**
 * Displays a toast message.
 *
 * @param {string} message - The message to display in the toast.
 * @param {string} color - The color of the toast.
 * @param {number} duration - The duration of the toast in milliseconds
 * @returns {Promise<void>} A promise that resolves when the toast is presented.
 */
async function toast(message: string, color: string, duration: number) {
  const toast = await toastController.create({
    message: message,
    position: "top",
    animated: true,
    duration: duration,
    color: color,
    cssClass: 'his-md-text',
    keyboardClose: true,
    buttons: [
      {
        side: 'end',
        text: 'x',
        role: 'cancel'
      }
    ]
  });
  return toast.present();
}

/**
 * Displays a warning toast message.
 *
 * @param {string} message - The message to display in the warning toast.
 * @param {number} duration - The duration of the toast in milliseconds. Default is 3000ms.
 * @returns {Promise<void>} A promise that resolves when the warning toast is presented.
 */
export function toastWarning(message: string, duration = 3000) {
  return toast(message, 'warning', duration)
}

/**
 * Displays a success toast message.
 *
 * @param {string} message - The message to display in the success toast.
 * @param {number} duration - The duration of the toast in milliseconds. Default is 2000ms.
 * @returns {Promise<void>} A promise that resolves when the success toast is presented.
 */
export function toastSuccess(message: string, duration = 2000) {
  return toast(message, 'success', duration)
}

/**
 * Displays a danger toast message.
 *
 * @param {string} message - The message to display in the danger toast.
 * @param {number} duration - The duration of the toast in milliseconds. Default is 3000ms.
 * @returns {Promise<void>} A promise that resolves when the danger toast is presented.
 */
export function toastDanger(message: string, duration = 3000) {
  return toast(message, 'danger', duration)
}

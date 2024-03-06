import { modalController } from "@ionic/vue";

export const modal = {
  async show(component: any, componentProps?: Record<string, any>, cssClass = 'custom-modal', backdropDismiss = true) {
    const m = await modalController.create({
      component,
      cssClass,
      backdropDismiss,
      componentProps,
    });
    m.present();
    const { data } = await m.onWillDismiss();
    if(data) return data;
  },
  
  async hide(data?: Record<string, any>) {
    await modalController.dismiss(data);
  }
}
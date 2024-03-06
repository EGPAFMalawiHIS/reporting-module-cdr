<script setup lang="ts">
import { resolveImage } from '@/utils/image';
import { person } from "ionicons/icons";
import { 
  IonPage, 
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonCardSubtitle,
  IonFooter,
  IonToolbar,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
} from '@ionic/vue';
import { ref } from 'vue';
import useAppInfo from '@/composables/appInfo';
import { toastWarning } from '@/utils/toasts';
import { useRouter } from 'vue-router';
import { ApiCore } from 'emr-api-client';

const { fullVersion } = useAppInfo();
const router = useRouter();
const redirectFrom = router.currentRoute.value.redirectedFrom;
const username = ref("");
const password = ref("");

const handleLogin = async () => {
  if(!username.value || !password.value) return toastWarning("Invalid login details");
  const res = await ApiCore.login(username.value, password.value);
  if (res.ok) router.push(redirectFrom ?? '/');
  else toastWarning(res.errorMessage as string);
}
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid style="margin: 0; padding: 0">
    <ion-row>
      <ion-col size="8">
        <ion-card-title class="title">E-MASTERCARD APP</ion-card-title>
        <ion-card-subtitle class="sub-title">{{ fullVersion }}</ion-card-subtitle>
        <img :src="resolveImage('report.png')" class="hero-image"  />
        <ion-footer class="footer-section">
          <ion-toolbar>
            <span>
              <img id="coat" :src="resolveImage('login-logos/Malawi-Coat_of_arms_of_arms.png')" alt="Malawi Coat of Arms logo" class="brand-logo-moh" />
              <img id="pepfar" :src="resolveImage('login-logos/PEPFAR.png')" alt="PEPFAR logo" class="brand-logo-pepfar"/>
            </span>
            <ion-item class="his-sm-text" slot="end" lines="none"> 
              <ion-button
                color="dark"
                fill="outline"
                size="large"
                slot="end"
                router-link="/settings/host"
              >
                Network
              </ion-button>
            </ion-item>
          </ion-toolbar>
        </ion-footer>
      </ion-col>
      <ion-col size="4"  class="form-section">
        <ion-icon :icon="person" class="avatar" />
        <h2>Welcome</h2>
        <h4>Please, log into your account</h4>
        <ion-item style="margin: 2rem 3.5rem">
          <ion-input
            type="text"
            placeholder="Username"
            v-model="username"
            @keyup.enter="handleLogin"
            :min="5"
            required
          />
        </ion-item>
        <ion-item style="margin: 2rem 3.5rem">
          <ion-input
            type="password"
            v-model="password"
            placeholder="Password"
            @keyup.enter="handleLogin"
            :max="100"
            :min="5"
            required
          />
        </ion-item>
        <ion-button
          expand="full"
          size="large"
          style="margin: 2rem 3.5rem; text-transform: none"
          @click.prevent="handleLogin"
        >
          Login
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 68px;
  font-weight: bold;
  margin: 8vh 1px 0;
}

.sub-title {
  text-align: center !important;
  font-size: 24px; 
  margin-bottom: 20px;
}

.hero-image {
  display: block; 
  width: 55%; 
  margin: 5px auto
}

.footer-section {
  position:absolute; 
  width: 100%; 
  bottom: 0; 
  left: 0; 
  padding-right: 1rem; 
  padding-left: 1rem;
}

.avatar {
  font-size: 8vw; 
  margin: 10vh 1px 0;
}

.form-section {
  background: #2839ad;
  color: #ffff;
  text-align: center;
  height: 100vh;
  padding: 38px 18px;
}

.brand-logo-pepfar {
  width: 80px;
}

.brand-logo-moh {
  width: 90px;
}
</style>
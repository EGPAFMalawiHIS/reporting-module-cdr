<template>
  <div v-if="isVisible">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <ion-menu-toggle auto-hide v-if="theOnlyOneChild.meta">
        <router-link :to="resolvePath(theOnlyOneChild.path, parentPath)" #="{ isActive, isExactActive }">
          <ion-item button :color="isActive && isExactActive ? 'primary' : ''">
            <menu-item-label :item="theOnlyOneChild" />
          </ion-item>
        </router-link>
      </ion-menu-toggle>
    </template>
    <ion-accordion-group v-else>
      <ion-accordion :value="item.path" :toggle-icon="chevronDown">
        <ion-item slot="header">
          <menu-item-label :item="item" />
        </ion-item>
        <div class="ion-padding-start" slot="content">
          <side-menu-item v-for="child of item.children" :item="child" :key="child.path" :parent-path="resolvePath(child.path, parentPath)" />
        </div>
      </ion-accordion>
    </ion-accordion-group>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import MenuItemLabel from "./SideMenuItemLabel.vue";
import { chevronDown } from "ionicons/icons";
import { RouteRecordRaw } from "vue-router";
import { IonMenuToggle, IonItem, IonAccordionGroup, IonAccordion } from "@ionic/vue";
import { resolvePath } from "@/utils/url";
import { ApiCore } from "emr-api-client";

const props = defineProps({ 
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  parentPath: {
    type: String,
    default: ""
  } 
});

const isVisible = computed(() => {
  if (props.item.meta && "hidden" in props.item.meta) return !props.item.meta?.hidden
  if (props.item.meta && "roles" in props.item.meta) return ApiCore.userHasRoles(props.item.meta.roles as any)
  return true
});

const alwaysShowRootMenu = computed(() => !!(props.item.meta && props.item.meta.alwaysShow))
const showingChildNumber = computed(() => props.item.children?.filter((item) => !(item.meta && item.meta.hidden)).length ?? 0);

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  return { ...props.item, path: '' }
})
</script>
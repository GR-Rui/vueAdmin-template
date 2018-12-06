<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

      <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" :to="resolvePath1(onlyOneChild.name)">
        <el-menu-item :index="resolvePath1(onlyOneChild.name)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
          <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>

          <router-link v-else :to="resolvePath1(child.name)" :key="child.name">
            <el-menu-item :index="resolvePath1(child.name)">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      var s = path.resolve(this.basePath, ...paths)
      return s
    },
    resolvePath1(name) {
      name = name.split('-')
      var s = ''
      if (name.length > 1) {
        s = '/' + name[0] + '/' + this.$route.params['id'] + '/' + name[1]
      } else {
        if (name[0] === 'projects' || name[0] === 'apply') {
          s = '/' + name[0]
        } else {
          s = '/' + name[0] + '/' + this.$route.params['id']
        }
      }
      return s
    }
  }
}
</script>

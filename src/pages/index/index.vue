<script setup lang="ts">
import { ref } from 'vue'

const draft = ref('')
const userMessage = ref('请按有赞「蛋糕烘焙」行业通用模版，自动帮我生成小票样式')

const reasoning = [
  '用户是正在有赞经营「蛋糕烘焙」行业的商家，想要进行小票样式自动创建服务。',
  '首先，考虑到用户使用的有赞系统，我还需要了解有赞系统小票配置的能力，比如最大的间距是多少，有哪些字段能智能配置上等',
  '为了更好地满足用户需求，我想要了解「蛋糕烘焙」都用了哪些小票模版，每种小票模版是怎么配置的',
  '我还需要计算出大部分商家的配置样式，输出给用户绝大多数商家的样式模版',
]

function showTip(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function startNewChat() {
  draft.value = ''
  showTip('已创建新会话')
}

function sendMessage() {
  const message = draft.value.trim()
  if (!message) return

  userMessage.value = message
  draft.value = ''
}
</script>

<template>
  <view class="assistant-page">
    <view class="top-bar">
      <view class="brand">
        <image class="top-icon" src="/static/assistant/search.svg" mode="aspectFit" />
        <text class="brand-name">加我智能</text>
      </view>

      <view class="top-actions">
        <view class="text-action" @tap="showTip('帮助中心')">帮助</view>
        <view class="text-action" @tap="showTip('已收藏')">收藏</view>
        <view class="divider" />
        <view class="icon-action" @tap="showTip('已关闭')">
          <image class="top-icon" src="/static/assistant/close.svg" mode="aspectFit" />
        </view>
      </view>
    </view>

    <scroll-view class="conversation" scroll-y>
      <view class="message-list">
        <view class="user-message-wrap">
          <text class="message-time">11：11</text>
          <view class="user-message">
            <text>{{ userMessage }}</text>
          </view>
        </view>

        <view class="assistant-message">
          <view class="avatar-wrap">
            <image class="avatar" src="/static/assistant/robot.svg" mode="aspectFit" />
          </view>

          <view class="thinking-card">
            <view class="thinking-title">
              <image class="thinking-icon" src="/static/assistant/thinking.svg" mode="aspectFit" />
              <text>正在深度思考...</text>
            </view>

            <view class="reasoning-block">
              <view class="timeline">
                <view class="timeline-dot">
                  <image
                    class="dot-outer"
                    src="/static/assistant/timeline-outer.svg"
                    mode="aspectFit"
                  />
                  <image
                    class="dot-inner"
                    src="/static/assistant/timeline-inner.svg"
                    mode="aspectFit"
                  />
                </view>
                <image
                  class="timeline-line"
                  src="/static/assistant/timeline-line.svg"
                  mode="scaleToFill"
                />
              </view>

              <view class="reasoning-copy">
                <text v-for="paragraph in reasoning" :key="paragraph" class="reasoning-paragraph">
                  {{ paragraph }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="composer">
      <view class="composer-actions">
        <view class="scene-button" @tap="showTip('请选择使用场景')">
          <text>更多场景</text>
          <image class="chevron" src="/static/assistant/chevron.svg" mode="aspectFit" />
        </view>

        <view class="new-chat-button" @tap="startNewChat">
          <image class="new-chat-icon" src="/static/assistant/new-chat.svg" mode="aspectFit" />
          <text>新会话</text>
        </view>
      </view>

      <view class="input-wrap">
        <input
          v-model="draft"
          class="message-input"
          placeholder="遇到问题？"
          placeholder-class="input-placeholder"
          confirm-type="send"
          @confirm="sendMessage"
        />
        <view class="send-button" @tap="sendMessage">
          <image class="send-icon" src="/static/assistant/send.svg" mode="aspectFit" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.assistant-page,
.assistant-page view,
.assistant-page text,
.assistant-page input {
  box-sizing: border-box;
}

.assistant-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #f8f8f8;
  box-shadow: inset 4px 0 0 #202033;
  color: #333;
  font-family:
    'PingFang SC',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.top-bar {
  display: flex;
  flex: none;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 16px;
}

.brand {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
}

.top-icon {
  width: 24px;
  height: 24px;
}

.brand-name,
.text-action {
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0.4px;
}

.brand-name {
  margin-left: 4px;
  white-space: nowrap;
}

.top-actions {
  display: flex;
  flex: none;
  align-items: center;
  margin-left: 8px;
}

.text-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 28px;
}

.divider {
  width: 1px;
  height: 12px;
  margin: 0 8px;
  background: #e4e4e4;
}

.icon-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.conversation {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  min-height: 0;
  padding: 10px 10px 0;
}

.message-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 12px;
}

.user-message-wrap {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 4px;
}

.message-time {
  position: absolute;
  top: -16px;
  right: 0;
  color: #999;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.4px;
}

.user-message {
  max-width: 100%;
  padding: 10px;
  border-radius: 16px 16px 2px;
  background: #155bd4;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
}

.assistant-message {
  position: relative;
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border-radius: 16px 16px 16px 2px;
  background: #fff;
}

.avatar-wrap {
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.avatar {
  width: 20px;
  height: 20px;
}

.thinking-card {
  width: 100%;
  height: 432px;
  padding: 8px;
  border-radius: 4px;
  background: #f8f8f8;
}

.thinking-title {
  display: flex;
  align-items: center;
  height: 20px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.4px;
}

.thinking-icon {
  width: 14px;
  height: 16px;
  margin-right: 4px;
}

.reasoning-block {
  position: relative;
  display: flex;
  margin-top: 5px;
}

.timeline {
  position: relative;
  flex: none;
  width: 17px;
  min-height: 344px;
}

.timeline-dot {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
}

.dot-outer,
.dot-inner {
  position: absolute;
}

.dot-outer {
  inset: 0;
  width: 12px;
  height: 12px;
}

.dot-inner {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}

.timeline-line {
  position: absolute;
  top: 12px;
  left: 6px;
  width: 1px;
  height: 328px;
}

.reasoning-copy {
  flex: 1;
  min-width: 0;
  padding-right: 1px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.reasoning-paragraph {
  display: block;
  margin-bottom: 4px;
}

.reasoning-paragraph:last-child {
  margin-bottom: 0;
}

.composer {
  flex: none;
  width: 100%;
  padding: 10px;
  background: #f8f8f8;
}

.composer-actions {
  display: flex;
  align-items: flex-start;
  height: 28px;
  margin-bottom: 8px;
}

.scene-button,
.new-chat-button {
  display: flex;
  align-items: center;
  height: 28px;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.4px;
}

.scene-button {
  width: 82px;
  padding: 4px 8px;
}

.chevron {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.new-chat-button {
  margin-left: 8px;
  padding: 0 8px 0 6px;
}

.new-chat-icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}

.input-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 8px 0 10px;
  overflow: hidden;
  border-radius: 4px;
  background: #fff;
}

.message-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  color: #333;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.4px;
}

.input-placeholder {
  color: #ccc;
}

.send-button {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 2px;
}

.send-icon {
  width: 24px;
  height: 24px;
}
</style>

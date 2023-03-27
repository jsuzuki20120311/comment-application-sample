// ライブラリの読み込み
import NicoJS from 'nicojs';


const nicoContainer = document.querySelector('.nico-container');
const nicoEl = document.querySelector('.nico');
const textArea = document.querySelector('.message-textarea');
const sendButton = document.querySelector('.message-button');

// コメントを流す領域の作成
const nico = new NicoJS({
  app: nicoEl,
  width: nicoContainer.offsetWidth,
  height: nicoContainer.offsetHeight
});

// ブラウザがリサイズされることを考慮し、再描画のタイミングでコメントを流す領域のサイズを更新する処理
const onRequestAnimationFrame = function () {
  console.log("onRequestAnimationFrame");

  const width = nicoContainer.offsetWidth;
  const height = nicoContainer.offsetHeight;
  nico.resize(width, height);
  window.requestAnimationFrame(onRequestAnimationFrame);
};

// メッセージ送信ボタンクリック時の処理
const onClickSendButton = function () {
  const message = textArea.value;
  nico.send(message); 
  textArea.value = '';
};

window.requestAnimationFrame(onRequestAnimationFrame);
sendButton.addEventListener('click', onClickSendButton);

// コメントの受付を開始
nico.listen();
// コメントの受付を開始
nico.loop();

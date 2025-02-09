import React from "react";

export const AppDescription = React.memo(function descriptionJsx() {
  return (
    <div className="mb-32" id="description">
      <h1 className="text-3xl">これは何？</h1>
      <p>
        これは、スマートフォン向けゲームアプリである
        <a href="https://bluearchive.jp/" className="text-blue-600">
          ブルーアーカイブ
        </a>
        の、装備品計算ツールです。
      </p>
      <p>生徒を選んで、必要装備数とそれを獲得するのに必要な周回数を算出できます。</p>
      <br />
      <h2 className="text-2xl">基本的な使い方</h2>
      <ol className="list-decimal ml-6">
        <li>「生徒を選択」ボタンから、生徒を選択する</li>
        <li>選択した各生徒の現在の装備レベルを入力する</li>
        <ul className="list-disc ml-6">
          <li>目標の初期設定は最大値です。</li>
        </ul>
        <li>「計算する」を押す</li>
      </ol>
      <br />
      <h2 className="text-2xl">周回数の計算方法</h2>
      <ul className="list-disc ml-6">
        <li>
          周回数は、
          <a
            href="https://ja.wikipedia.org/wiki/%E7%B7%9A%E5%9E%8B%E8%A8%88%E7%94%BB%E6%B3%95"
            className="text-blue-600"
          >
            線形計画法
          </a>
          を用いて計算しています。
        </li>
        <li>目的関数は、周回数の合計の最小化です。</li>
        <li>制約は、必要装備数以上の取得です。</li>
      </ul>

      <h3 className="text-2xl mt-4">周回数の計算の具体例</h3>
      <p>※立式の方法だけ記載します。</p>
      <ul>
        <li>例えば、T8帽子が30個、T8グローブが20個欲しいとします。</li>
        <li>
          T8帽子は22-1、22-2、22-3、22-5からドロップし、T8グローブは、22-1、22-2、22-3からドロップします。
        </li>
        <li>
          22-1 ~ 22-5 の周回数をそれぞれ、x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, x<sub>4</sub>
          , x<sub>5</sub>とします。
          <p> </p>
        </li>
        <li>T8帽子は、通常ドロップ時、1周回あたりの期待値は</li>
        <ul className="list-disc ml-6">
          <li>22-1 で 0.336</li>
          <li>22-2, 22-3、22-5 で 0.252</li>
        </ul>
        <li className="list-none">
          となります。(参照:
          <a
            href="https://bluearchive.wikiru.jp/?%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A0%E3%81%AE%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E7%8E%87#lc4ed08c"
            className="text-blue-600"
          >
            ブルーアーカイブwiki
          </a>
          )
        </li>
        <li className="list-none">必要数が30の場合、各周回数をそれぞれx,y,zとすると、制約は</li>
        <li className="list-none text-center">
          30 ≦ 0.336x<sub>1</sub> + 0.252x<sub>2</sub> + 0.252x<sub>3</sub> + 0.252x<sub>5</sub>
        </li>
        <li className="list-none">となります。</li>
        <li className="list-none">T8グローブに関しても同様に考えると、制約は</li>
        <li className="list-none text-center">
          20 ≦ 0.252x<sub>1</sub> + 0.336x<sub>2</sub> + 0.252x<sub>3</sub>
        </li>
        <li className="list-none">となります。</li>
        <li className="list-none">
          この時、周回数の合計である x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub> + x<sub>4</sub>+
          x<sub>5</sub>
          が最小になるような 0 ≦ x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, x<sub>4</sub>, x
          <sub>5</sub> を求めます。
        </li>
        <li>(ここから先は通常の線形計画法の解き方と同じなので省略します。)</li>
      </ul>
      <br />
      <h2 className="text-2xl">その他</h2>
      <ul className="list-disc ml-6">
        <li>
          「保存する」ボタンを押すと、入力した現在と目標のレベル・選択した生徒がローカル（使用しているPC・スマホ）に保存されます。
        </li>
        <li>計算結果に現在の所持数との差を表示させることも可能です。</li>
        <li>
          現在の所持数は、右上のタブから、または「所持数との差を表示」をonにして、数字を選択すると入力できます。
        </li>
        <li>所持装備数は、自動的にローカルに保存されます。</li>
      </ul>
      <br />
      <p className="text-xl">
        フィードバック・改善提案・不具合などあれば、
        <a className="text-blue-400" href="https://x.com/nulo_for_vtuber">
          作者のTwitter
        </a>
        までお願いします。
      </p>
    </div>
  );
});

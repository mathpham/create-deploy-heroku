import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="container">
              <h1>よろこそ</h1> 
              <dt>【概要】</dt>
              <p>このWebアプリは家族の生活費を管理するアプリです。アプリのバックエンド側はSpring Bootフレームワーク を使用し、フロントエンド側はReactJsを使用しました。</p>
              <dl>
                <dt>【機能】</dt>
                <dd>・認証、認可:Spring SecurityとJson Web Service でユーザーの要求を認証し、世帯と家族のメンバーに認可する。</dd>
                <dd>・家族の生活費の管理:毎月の費用を表示して、費用を追加して、修正して、削除して、抽出する。</dd>
                <dd>・ストア管理(世帯権のみ):買い物の場所を管理して、追加して、修正する。</dd>
                <dd>・家族メンバーの登録(世帯権のみ):家族メンバーを表示し、登録する。</dd>
              </dl>  
              <p><b>作成者：ファムバンジャン</b></p>
            </div>
        );
    }
}

export default Home;

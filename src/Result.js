import React, { useState, useEffect } from 'react';

const Result = ({ chatHistory, onReturnToMenu, userInfo }) => {
  const [evaluation, setEvaluation] = useState('評価を生成中...');
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(true);
  const [summary, setSummary] = useState('会話サマリーを生成中...');
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatHistory, userInfo }),
        });

        if (!response.ok) {
          throw new Error('評価APIからの応答がありません');
        }

        const data = await response.json();
        setEvaluation(data.evaluation);
      } catch (error) {
        console.error('評価生成エラー:', error);
        setEvaluation('評価の生成中にエラーが発生しました。\nもう一度試すか、メニューに戻ってください。');
      } finally {
        setIsLoadingEvaluation(false);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatHistory }),
        });

        if (!response.ok) {
          throw new Error('要約APIからの応答がありません');
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error('要約生成エラー:', error);
        setSummary('会話サマリーの生成中にエラーが発生しました。\nもう一度試すか、メニューに戻ってください。');
      } finally {
        setIsLoadingSummary(false);
      }
    };

    fetchEvaluation();
    fetchSummary();
  }, [chatHistory, userInfo]);

  return (
    <div className="Result">
      <h2>シミュレーション結果</h2>
      <div className="summary-area">
        <h3>会話サマリー:</h3>
        {isLoadingSummary ? (
          <p>会話サマリーを生成中...</p>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap' }}>{summary}</div>
        )}
      </div>
      <div className="evaluation-area">
        <h3>評価と指導ポイント:</h3>
        {isLoadingEvaluation ? (
          <p>評価を生成中...</p>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap' }}>{evaluation}</div>
        )}
      </div>
      <button onClick={onReturnToMenu} className="return-button">メニューに戻る</button>
    </div>
  );
};


export default Result;


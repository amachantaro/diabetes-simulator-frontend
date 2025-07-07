import React, { useState } from 'react';
import Menu from './Menu';
import Chat from './Chat';
import Result from './Result'; // Resultコンポーネントをインポート
import './App.css';

function App() {
  const [page, setPage] = useState('info'); // 'info', 'menu', 'chat', 'result'
  const [selectedTheme, setSelectedTheme] = useState('');
  const [userInfo, setUserInfo] = useState({
    height: '',
    weight: '',
    age: '',
    activityLevel: 'low',
    medicalHistory: [], // 一般内科的病歴
    symptomsHyperglycemia: [], // 高血糖による症状
    symptomsComplications: [], // 糖尿病合併症を疑う症状
    pregnancyHistory: '', // 妊娠・出産歴
    familyHistoryDiabetes: false, // 糖尿病の家族歴
    lifestyleSmoking: false, // 喫煙
    lifestyleDrinking: false, // 飲酒
    lifestyleDiet: '', // 食生活
    lifestylePhysicalActivity: '', // 身体活動度
    livingArrangement: '', // 同居家族の有無
  });
  const [chatHistory, setChatHistory] = useState([]); // チャット履歴を保持するstateを追加

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (Array.isArray(userInfo[name])) { // This is a checkbox group
        setUserInfo(prevState => ({
          ...prevState,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter(item => item !== value),
        }));
      } else { // This is a single checkbox
        setUserInfo(prevState => ({
          ...prevState,
          [name]: checked,
        }));
      }
    } else { // Regular input/select
      setUserInfo(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    setPage('menu');
  };

  const handleFinishChat = (history) => {
    setChatHistory(history); // Chatコンポーネントから受け取った履歴を保存
    setPage('result');
  };

  const handleReturnToMenu = () => {
    setPage('menu');
    setChatHistory([]); // 履歴をクリア
  };

  if (page === 'info') {
    return (
      <div className="App">
        <header className="App-header">
          <h1>糖尿病療養指導シミュレーター</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>身長 (cm): </label>
              <input type="number" name="height" value={userInfo.height} onChange={handleChange} />
            </div>
            <div>
              <label>体重 (kg): </label>
              <input type="number" name="weight" value={userInfo.weight} onChange={handleChange} />
            </div>
            <div>
              <label>年齢: </label>
              <input type="number" name="age" value={userInfo.age} onChange={handleChange} />
            </div>
            <div>
              <label>活動量: </label>
              <select name="activityLevel" value={userInfo.activityLevel} onChange={handleChange}>
                <option value="low">低い</option>
                <option value="medium">普通</option>
                <option value="high">高い</option>
              </select>
            </div>

            <h3>詳細情報（わかる範囲でご入力ください）</h3>

            <div>
              <label>一般内科的病歴:</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="medicalHistory" value="hypertension" checked={userInfo.medicalHistory.includes('hypertension')} onChange={handleChange} /> 高血圧</label>
                <label><input type="checkbox" name="medicalHistory" value="dyslipidemia" checked={userInfo.medicalHistory.includes('dyslipidemia')} onChange={handleChange} /> 脂質異常症</label>
                <label><input type="checkbox" name="medicalHistory" value="cardiovascular" checked={userInfo.medicalHistory.includes('cardiovascular')} onChange={handleChange} /> 心血管疾患</label>
                <label><input type="checkbox" name="medicalHistory" value="cerebrovascular" checked={userInfo.medicalHistory.includes('cerebrovascular')} onChange={handleChange} /> 脳血管障害</label>
                <label><input type="checkbox" name="medicalHistory" value="periodontal" checked={userInfo.medicalHistory.includes('periodontal')} onChange={handleChange} /> 歯周病</label>
                <label><input type="checkbox" name="medicalHistory" value="other" checked={userInfo.medicalHistory.includes('other')} onChange={handleChange} /> その他</label>
              </div>
            </div>

            <div>
              <label>高血糖による症状:</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="symptomsHyperglycemia" value="thirst" checked={userInfo.symptomsHyperglycemia.includes('thirst')} onChange={handleChange} /> 口渇</label>
                <label><input type="checkbox" name="symptomsHyperglycemia" value="polyuria" checked={userInfo.symptomsHyperglycemia.includes('polyuria')} onChange={handleChange} /> 多尿</label>
                <label><input type="checkbox" name="symptomsHyperglycemia" value="polydipsia" checked={userInfo.symptomsHyperglycemia.includes('polydipsia')} onChange={handleChange} /> 多飲</label>
                <label><input type="checkbox" name="symptomsHyperglycemia" value="weightLoss" checked={userInfo.symptomsHyperglycemia.includes('weightLoss')} onChange={handleChange} /> 体重減少</label>
                <label><input type="checkbox" name="symptomsHyperglycemia" value="fatigue" checked={userInfo.symptomsHyperglycemia.includes('fatigue')} onChange={handleChange} /> 易疲労感</label>
                <label><input type="checkbox" name="symptomsHyperglycemia" value="none" checked={userInfo.symptomsHyperglycemia.includes('none')} onChange={handleChange} /> 特になし</label>
              </div>
            </div>

            <div>
              <label>糖尿病合併症を疑う症状:</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="symptomsComplications" value="visionLoss" checked={userInfo.symptomsComplications.includes('visionLoss')} onChange={handleChange} /> 視力低下</label>
                <label><input type="checkbox" name="symptomsComplications" value="numbnessLegs" checked={userInfo.symptomsComplications.includes('numbnessLegs')} onChange={handleChange} /> 下肢しびれ</label>
                <label><input type="checkbox" name="symptomsComplications" value="claudication" checked={userInfo.symptomsComplications.includes('claudication')} onChange={handleChange} /> 歩行時下肢痛</label>
                <label><input type="checkbox" name="symptomsComplications" value="erectileDysfunction" checked={userInfo.symptomsComplications.includes('erectileDysfunction')} onChange={handleChange} /> 勃起障害</label>
                <label><input type="checkbox" name="symptomsComplications" value="amenorrhea" checked={userInfo.symptomsComplications.includes('amenorrhea')} onChange={handleChange} /> 無月経</label>
                <label><input type="checkbox" name="symptomsComplications" value="sweatingAbnormal" checked={userInfo.symptomsComplications.includes('sweatingAbnormal')} onChange={handleChange} /> 発汗異常</label>
                <label><input type="checkbox" name="symptomsComplications" value="constipation" checked={userInfo.symptomsComplications.includes('constipation')} onChange={handleChange} /> 便秘</label>
                <label><input type="checkbox" name="symptomsComplications" value="diarrhea" checked={userInfo.symptomsComplications.includes('diarrhea')} onChange={handleChange} /> 下痢</label>
                <label><input type="checkbox" name="symptomsComplications" value="footUlcer" checked={userInfo.symptomsComplications.includes('footUlcer')} onChange={handleChange} /> 足潰瘍・壊疽</label>
                <label><input type="checkbox" name="symptomsComplications" value="none" checked={userInfo.symptomsComplications.includes('none')} onChange={handleChange} /> 特になし</label>
              </div>
            </div>

            <div>
              <label>妊娠・出産歴:</label>
              <input type="text" name="pregnancyHistory" value={userInfo.pregnancyHistory} onChange={handleChange} placeholder="例: 巨大児、妊娠糖尿病など" />
            </div>

            <div>
              <label>糖尿病の家族歴:</label>
              <input type="checkbox" name="familyHistoryDiabetes" checked={userInfo.familyHistoryDiabetes} onChange={handleChange} />
            </div>

            <div>
              <label>喫煙:</label>
              <input type="checkbox" name="lifestyleSmoking" checked={userInfo.lifestyleSmoking} onChange={handleChange} />
            </div>

            <div>
              <label>飲酒:</label>
              <input type="checkbox" name="lifestyleDrinking" checked={userInfo.lifestyleDrinking} onChange={handleChange} />
            </div>

            <div>
              <label>食生活:</label>
              <input type="text" name="lifestyleDiet" value={userInfo.lifestyleDiet} onChange={handleChange} placeholder="例: 外食が多い、自炊中心など" />
            </div>

            <div>
              <label>身体活動度:</label>
              <input type="text" name="lifestylePhysicalActivity" value={userInfo.lifestylePhysicalActivity} onChange={handleChange} placeholder="例: 運動習慣、通勤方法など" />
            </div>

            <div>
              <label>同居家族の有無:</label>
              <input type="text" name="livingArrangement" value={userInfo.livingArrangement} onChange={handleChange} placeholder="例: 一人暮らし、配偶者と二人暮らしなど" />
            </div>

            <p style={{ fontSize: '0.9em', color: '#666' }}>※わかる範囲でご入力ください</p>

            <button type="submit">開始</button>
          </form>
        </header>
      </div>
    );
  }

  if (page === 'menu') {
    return (
      <div className="App">
        <header className="App-header">
          <Menu onSelectTheme={(theme) => {
            setSelectedTheme(theme);
            setPage('chat');
          }} />
        </header>
      </div>
    );
  }

  if (page === 'chat') {
    return (
      <div className="App">
        <header className="App-header">
          <Chat 
            theme={selectedTheme} 
            onFinish={handleFinishChat} // onFinishにhandleFinishChatを渡す
            userInfo={userInfo} // userInfoをChatコンポーネントに渡す
          />
        </header>
      </div>
    );
  }

  if (page === 'result') {
    return (
      <div className="App">
        <header className="App-header">
          <Result 
            chatHistory={chatHistory} 
            onReturnToMenu={handleReturnToMenu} 
            userInfo={userInfo} // userInfoをResultコンポーネントに渡す
          />
        </header>
      </div>
    );
  }

  return null;
}

export default App;

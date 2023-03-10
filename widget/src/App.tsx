import { useState } from 'react';
import { ButtonOpen } from './components/ButtonOpen';
import { Form } from './components/Form';
import style from './app.module.css';

function App() {
  const [open, setopen] = useState(false);

  return (
    <div className={"cleanslate"}>
    <div className={style.container}>
      <Form open={open} apiKey="OX3bW6wtUaz/9zmf0KWvLu/KrUgVswf2kZy0kNR+7lBRHzyp0l6VCNanJkbBmjd5N/rcdP99sc6mbXhxquZmFg==" />
      <ButtonOpen setopen={setopen} open={open} />
    </div>
    </div>
  )
}

export default App

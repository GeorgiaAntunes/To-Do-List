import { useState } from 'react'

import './App.css'

interface ListProps {
  id: number;
  isChecked: boolean;
  content: string;
}



function App() {
  const [list, setList] = useState<ListProps[]>([])
  const [inputText, setInpuText] = useState<string>('')

  const addItem = (): void => {
    if(inputText !== ''){
      const newItem = {
        id: list.length,
        isChecked: false, 
        content: inputText 
      }
      const newList = [...list, newItem]
      setList(newList)
      setInpuText('')
      console.log(newList) //eu nao posso passar o list aqui porque a atualizacao de estado no React é assincrona
    }
  }

  const handleInputText = (event: React.ChangeEvent<HTMLInputElement>): void => {
     setInpuText(event.target.value)
  } 

  const handleDeleteItem = (id: number): void => {
   setList(list.filter(item => item.id !== id));
  }

  // const handleItemIsChecked = (id: number): void => {
  //   const newList = [...list]
    

  //   const itemChecked = list.filter(item => item.id === id ? item.isChecked = !item.isChecked : item.isChecked)
  //   setList();
  // }
  const handleItemIsChecked = (id: number): void => {
    const updatedList = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      }
      return item;
    });
    setList(updatedList);
  };


  return (
    <>
      <div className="Container">
        <input className="InputStyle" type="text" value={inputText} onChange={handleInputText}/>
        <button className="ButtonStyle" onClick={addItem}></button> 
        {list.map((item) => {
          return (
              <>
              <Item key={item.id} dataItem={item} handleItemIsChecked={handleItemIsChecked} 
              handleDeleteItem={handleDeleteItem}/>
              {/* <SpecialItem content={item.content} IsChecked={item.IsChecked} id={item.id} /> */}
              </>
          )
        })}
      </div>
    </>
  )
}

interface ItemProps {
  dataItem: ListProps;
  handleItemIsChecked: (id: number) => void;
  handleDeleteItem: (id: number) => void;
}

// const SpecialItem: React.FC<ListProps> = ({content, IsChecked, id}) => {
//   return <div>
//     {content} - {IsChecked} - {id}
//   </div>
// }

const Item: React.FC<ItemProps> = ({dataItem, handleItemIsChecked, handleDeleteItem}) => {
  return (
    <div className='ItemContentStyle'>
        <input className="checkboxStyle" type="checkbox" checked={dataItem.isChecked} onChange={() => {handleItemIsChecked(dataItem.id)}}/>
        <span className={dataItem.isChecked ? 'StrikedText' : ''}>{dataItem.content}</span>
        <button className="ButtonDeleteStyle"onClick={() => handleDeleteItem(dataItem.id)}>X</button>
    </div>
  )
  
}


export default App

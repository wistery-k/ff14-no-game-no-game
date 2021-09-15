import React from 'react';
import { useInitializedState } from '../Game';
import Combo from './objects/Combo';
import Enemy from './objects/Enemy';
import IronChariot from './objects/IronChariot';
import LunarDynamo from './objects/LunarDynamo';
import Player from './objects/Player';

export default function Level1() {
   const [index1, ] = useInitializedState(Math.floor(Math.random() * 2));
   const [index2, ] = useInitializedState(Math.floor(Math.random() * 4));
   let [index3, ] = useInitializedState(Math.floor(Math.random() * 3));
   if (index3 >= index2) {
      index3 += 1;
   }
   return (
      <>
         <Player />
         <Enemy hp={1800}>
            <IronChariot hitTime={4}
               castBegin={-3} castName="アイアンチャリオット"
               size={120}
               indicationBegin={-3}
            />
            <LunarDynamo hitTime={10}
               castBegin={-3} castName="ルナダイナモ"
               size={80} size2={400}
               indicationBegin={-3}
            />
            {[
               <IronChariot hitTime={16} castBegin={-3} size={120} castName="アイアンチャリオット" />,
               <LunarDynamo hitTime={16} castBegin={-3} size={80} size2={400} castName="ルナダイナモ" />,
            ][index1]}
            <Combo hitTime={22} castBegin={-3} castName="連続アイアンダイナモ">
               <IronChariot size={120} />
               <LunarDynamo hitTime={1} size={80} size2={400} />
            </Combo>
            {[
               <Combo hitTime={28} castBegin={-3} castName="連続アイアンチャリオット">
                  <IronChariot size={120} />
                  <IronChariot hitTime={1} size={120} />
               </Combo>,
               <Combo hitTime={28} castBegin={-3} castName="連続アイアンダイナモ">
                  <IronChariot size={120} />
                  <LunarDynamo hitTime={1} size={80} size2={400} />
               </Combo>,
               <Combo hitTime={28} castBegin={-3} castName="連続ルナチャリオット">
                  <LunarDynamo size={80} size2={400} />
                  <IronChariot hitTime={1} size={120} />
               </Combo>,
               <Combo hitTime={28} castBegin={-3} castName="連続ルナダイナモ">
                  <LunarDynamo size={80} size2={400} />
                  <LunarDynamo hitTime={1} size={80} size2={400} />
               </Combo>,
            ][index2]}
            {[
               <Combo hitTime={34} castBegin={-3} castName="連続アイアンチャリオット">
                  <IronChariot size={120} />
                  <IronChariot hitTime={1} size={120} />
               </Combo>,
               <Combo hitTime={34} castBegin={-3} castName="連続アイアンダイナモ">
                  <IronChariot size={120} />
                  <LunarDynamo hitTime={1} size={80} size2={400} />
               </Combo>,
               <Combo hitTime={34} castBegin={-3} castName="連続ルナチャリオット">
                  <LunarDynamo size={80} size2={400} />
                  <IronChariot hitTime={1} size={120} />
               </Combo>,
               <Combo hitTime={34} castBegin={-3} castName="連続ルナダイナモ">
                  <LunarDynamo size={80} size2={400} />
                  <LunarDynamo hitTime={1} size={80} size2={400} />
               </Combo>,
            ][index3]}
         </Enemy>
      </>
   );
};
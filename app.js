const STORAGE_KEY="certstack-progress-v1";

function loadProgress(){
  const legacyXp=Number(localStorage.getItem("certstack-xp")||0);
  const fallback={
    xp:legacyXp,
    level:Number(localStorage.getItem("certstack-level")||1),
    completedQuests:[],
    completedModules:[],
    unlockedModules:legacyXp>=100?[1,2]:[1],
    activeModule:legacyXp>=100?2:1,
    activeQuest:"cloud"
  };
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved?{...fallback,...saved}:fallback;
  }catch{
    return fallback;
  }
}

const saved=loadProgress();
const state={
  xp:Number(saved.xp||0),
  level:Number(saved.level||1),
  completed:new Set(saved.completedQuests||[]),
  completedModules:new Set(saved.completedModules||[]),
  unlockedModules:new Set(saved.unlockedModules||[1]),
  activeModule:Number(saved.activeModule||1),
  activeQuest:saved.activeQuest||"cloud"
};

// Progression rule migration: Module 2+ must be earned through the new Module 1 vocab + exam-practice gate.
if(!state.completed.has("m1test")){
  state.completedModules.delete(1);
  [...state.unlockedModules].forEach(n=>{ if(n>1) state.unlockedModules.delete(n); });
  if(state.activeModule>1) state.activeModule=1;
}

const quests=["cloud","shared","models","cost"];
const questLabel=document.getElementById("questLabel");
const xpBar=document.getElementById("xpBar");
const xpLabel=document.getElementById("xpLabel");
const levelLabel=document.getElementById("levelLabel");

function saveProgress(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify({
    xp:state.xp,
    level:state.level,
    completedQuests:[...state.completed],
    completedModules:[...state.completedModules],
    unlockedModules:[...state.unlockedModules],
    activeModule:state.activeModule,
    activeQuest:state.activeQuest
  }));
  // Keep legacy keys for compatibility with the existing build.
  localStorage.setItem("certstack-xp",state.xp);
  localStorage.setItem("certstack-level",state.level);
}

function renderStats(){
  const into=state.xp%100;
  levelLabel.textContent="LVL "+state.level;
  xpLabel.textContent=into+" / 100 XP";
  xpBar.style.width=into+"%";
}

function addXp(amount){
  state.xp+=amount;
  state.level=Math.floor(state.xp/100)+1;
  saveProgress();
  renderStats();
}

function questUnlocked(index){
  if(index===0) return true;
  return state.completed.has(quests[index-1]);
}

function restoreQuestControls(){
  const config=[
    ["cloud","cloudContinue","UNLOCK QUEST 2 →"],
    ["shared","sharedContinue","UNLOCK QUEST 3 →"],
    ["models","modelsContinue","UNLOCK QUEST 4 →"],
    ["cost","finishBtn","COMPLETE MODULE ★"]
  ];
  config.forEach(([quest,id,label])=>{
    if(!state.completed.has(quest)) return;
    const button=document.getElementById(id);
    if(button){
      button.disabled=false;
      button.classList.remove("locked-btn");
      button.textContent=label;
    }
  });
}

function showQuest(id,{scroll=true}={}){
  if(id!=="complete"){
    const idx=quests.indexOf(id);
    if(idx<0 || !questUnlocked(idx)) return;
    state.activeQuest=id;
  }
  document.querySelectorAll("#module1 > .quest").forEach(q=>q.classList.toggle("active",q.id===id));
  const idx=quests.indexOf(id);
  questLabel.textContent=id==="complete"?"MODULE COMPLETE":"QUEST "+(idx+1)+" / 4";

  document.querySelectorAll("#module1 .quest-map .map-node[data-map]").forEach((node,i)=>{
    const unlocked=questUnlocked(i);
    node.disabled=!unlocked;
    node.classList.toggle("active",i===idx);
    node.classList.toggle("done",state.completed.has(quests[i]));
  });
  const vocabNode=document.getElementById("module1VocabNode");
  const practiceNode=document.getElementById("module1PracticeNode");
  if(vocabNode){
    vocabNode.disabled=!state.completed.has("cost");
    vocabNode.classList.toggle("done",state.completed.has("m1vocab"));
    vocabNode.classList.remove("active");
  }
  if(practiceNode){
    practiceNode.disabled=!state.completed.has("m1vocab");
    practiceNode.classList.toggle("done",state.completedModules.has(1));
    practiceNode.classList.remove("active");
  }

  saveProgress();
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}

function success(feedback,message,button,quest,xp){
  if(!state.completed.has(quest)){
    state.completed.add(quest);
    addXp(xp);
  }
  feedback.className="feedback good";
  feedback.textContent=message+" +"+xp+" XP";
  button.disabled=false;
  button.classList.remove("locked-btn");
  const labels={
    cloudContinue:"UNLOCK QUEST 2 →",
    sharedContinue:"UNLOCK QUEST 3 →",
    modelsContinue:"UNLOCK QUEST 4 →",
    finishBtn:"OPEN VOCAB MATCH →"
  };
  if(labels[button.id]) button.textContent=labels[button.id];
  saveProgress();
  renderRoadmap();
}

function fail(feedback,message){
  feedback.className="feedback bad";
  feedback.textContent=message;
}

function completeModule(moduleNumber){
  state.completedModules.add(moduleNumber);
  const next=moduleNumber+1;
  if(next<=12) state.unlockedModules.add(next);
  saveProgress();
  renderRoadmap();
}

function renderRoadmap(){
  document.querySelectorAll(".module-card[data-module-number]").forEach(card=>{
    const number=Number(card.dataset.moduleNumber);
    const completed=state.completedModules.has(number);
    const unlocked=state.unlockedModules.has(number);
    const hasScreen=Boolean(document.getElementById("module"+number));
    const small=card.querySelector("small");

    card.classList.toggle("completed-module",completed);
    card.classList.toggle("unlocked-module",unlocked && !completed);
    card.classList.toggle("locked-module",!unlocked);
    card.classList.toggle("active-module",state.activeModule===number);

    // Only built module screens can be opened right now.
    card.disabled=!unlocked || !hasScreen;

    if(small){
      if(completed) small.textContent="COMPLETED // REPLAY";
      else if(unlocked && hasScreen) small.textContent=number===1?"IN PROGRESS":"UNLOCKED";
      else if(unlocked && !hasScreen) small.textContent="UNLOCKED // COMING SOON";
      else small.textContent="LOCKED";
    }
  });

  const progress=document.querySelector(".roadmap-progress strong");
  if(progress) progress.textContent="MODULE "+state.activeModule+" OF 12";
}

function showModule(moduleId,{scroll=true}={}){
  const number=Number(moduleId.replace("module",""));
  if(!state.unlockedModules.has(number)) return;
  const target=document.getElementById(moduleId);
  if(!target) return;

  state.activeModule=number;
  document.querySelectorAll(".module-screen").forEach(screen=>{
    screen.classList.toggle("active-module-screen",screen.id===moduleId);
  });

  renderRoadmap();
  saveProgress();
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-cloud-answer]").forEach(btn=>btn.addEventListener("click",()=>{
  const f=document.getElementById("cloudFeedback");
  if(btn.dataset.cloudAnswer==="rent"){
    success(f,"YES — cloud lets you add capacity for the spike and scale back afterward.",document.getElementById("cloudContinue"),"cloud",25);
  }else fail(f,"That is the traditional datacenter move. Cloud computing avoids buying permanent hardware for temporary demand.");
}));
document.getElementById("cloudContinue").addEventListener("click",()=>showQuest("shared"));

document.querySelectorAll("[data-shared-answer]").forEach(btn=>btn.addEventListener("click",()=>{
  const f=document.getElementById("sharedFeedback");
  if(btn.dataset.sharedAnswer==="provider"){
    success(f,"RIGHT — the provider owns physical datacenter security, power, cooling, networking, and hosts.",document.getElementById("sharedContinue"),"shared",25);
  }else fail(f,"Not in the cloud. You still own your data, devices, and identities, but the provider owns the physical datacenter.");
}));
document.getElementById("sharedContinue").addEventListener("click",()=>showQuest("models"));

document.querySelectorAll("[data-model-answer]").forEach(btn=>btn.addEventListener("click",()=>{
  const f=document.getElementById("modelFeedback");
  if(btn.dataset.modelAnswer==="hybrid"){
    success(f,"YES — hybrid combines private and public cloud so workloads can live in different places.",document.getElementById("modelsContinue"),"models",25);
  }else fail(f,"Look for the model that combines private resources with public cloud resources.");
}));
document.getElementById("modelsContinue").addEventListener("click",()=>showQuest("cost"));

document.querySelectorAll("[data-cost-answer]").forEach(btn=>btn.addEventListener("click",()=>{
  const f=document.getElementById("costFeedback");
  if(btn.dataset.costAnswer==="opex"){
    success(f,"CORRECT — paying for cloud resources as you consume them is an operational-expense, consumption-based model.",document.getElementById("finishBtn"),"cost",25);
  }else fail(f,"CapEx is the up-front purchase of physical infrastructure. Paying as you consume cloud services is OpEx.");
}));

function showModule1Vocab({scroll=true}={}){
  if(!state.completed.has("cost")) return;
  document.querySelectorAll("#module1 > .quest").forEach(q=>q.classList.remove("active"));
  document.getElementById("module1Vocab")?.classList.add("active");
  document.querySelectorAll("#module1 .quest-map .map-node").forEach(n=>n.classList.remove("active"));
  const node=document.getElementById("module1VocabNode");
  if(node){node.disabled=false;node.classList.add("active");}
  questLabel.textContent="VOCAB MATCH";
  localStorage.setItem("certstack-module-1-position","vocab");
  saveProgress();
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}

function showModule1Practice({scroll=true}={}){
  if(!state.completed.has("m1vocab")) return;
  document.querySelectorAll("#module1 > .quest").forEach(q=>q.classList.remove("active"));
  document.getElementById("module1Practice")?.classList.add("active");
  document.querySelectorAll("#module1 .quest-map .map-node").forEach(n=>n.classList.remove("active"));
  const node=document.getElementById("module1PracticeNode");
  if(node){node.disabled=false;node.classList.add("active");}
  questLabel.textContent="EXAM PRACTICE";
  localStorage.setItem("certstack-module-1-position","test");
  saveProgress();
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}

function restoreModule1Stage(){
  if(state.completedModules.has(1)){showQuest("complete",{scroll:false});return;}
  const pos=localStorage.getItem("certstack-module-1-position");
  if(pos==="test" && state.completed.has("m1vocab")){showModule1Practice({scroll:false});return;}
  if(pos==="vocab" && state.completed.has("cost")){showModule1Vocab({scroll:false});return;}
  showQuest(state.activeQuest,{scroll:false});
}

document.getElementById("finishBtn").addEventListener("click",()=>showModule1Vocab());

const continueToModule2=document.getElementById("continueToModule2");
if(continueToModule2) continueToModule2.addEventListener("click",()=>showModule("module2"));

document.getElementById("replayBtn").addEventListener("click",()=>showQuest("cloud"));

document.querySelectorAll("#module1 .quest-map .map-node[data-map]").forEach((btn,i)=>{
  btn.addEventListener("click",()=>showQuest(quests[i]));
});
document.getElementById("module1VocabNode")?.addEventListener("click",()=>showModule1Vocab());
document.getElementById("module1PracticeNode")?.addEventListener("click",()=>showModule1Practice());

document.querySelectorAll(".module-card[data-module-jump]").forEach(btn=>{
  btn.addEventListener("click",()=>showModule(btn.dataset.moduleJump));
});

const backToModule1=document.getElementById("backToModule1");
if(backToModule1) backToModule1.addEventListener("click",()=>showModule("module1"));

document.querySelectorAll("[data-m2-answer]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const feedback=document.getElementById("m2Feedback");
    if(btn.dataset.m2Answer==="scalability"){
      feedback.className="feedback good";
      feedback.textContent="YES — this is scalability. The service is already available; the problem is handling more demand, so you add capacity.";
    }else{
      feedback.className="feedback bad";
      feedback.textContent="Close, but availability is about staying up and reachable. Here the app is healthy; it just needs more capacity for increased demand.";
    }
  });
});

// Restore each visitor's saved local progress.
restoreQuestControls();
renderStats();
renderRoadmap();
showModule("module"+state.activeModule,{scroll:false});
if(state.activeModule===1){
  restoreModule1Stage();
}


// ---------------- MODULE 1 VOCAB + EXAM PRACTICE ----------------
(function setupModule1Review(){
  const section=document.getElementById("module1Vocab");
  if(!section) return;
  const vocabKey="m1vocab";
  const next=document.getElementById("module1VocabNext");
  const feedback=document.getElementById("module1VocabFeedback");
  let selectedTerm=null;
  let selectedDefinition=null;
  const matched=new Set();

  function markVocabComplete(){
    section.querySelectorAll(".vocab-card").forEach(card=>card.classList.add("matched-card"));
    if(next){
      next.disabled=false;
      next.classList.remove("locked-btn");
      next.textContent="OPEN EXAM PRACTICE →";
    }
    if(feedback){
      feedback.className="feedback vocab-feedback good";
      feedback.textContent="VOCAB CLEARED — all terms matched.";
    }
    const node=document.getElementById("module1VocabNode");
    if(node) node.classList.add("done");
    const testNode=document.getElementById("module1PracticeNode");
    if(testNode) testNode.disabled=false;
  }

  if(state.completed.has(vocabKey)) markVocabComplete();

  section.querySelectorAll(".vocab-card").forEach(card=>{
    card.addEventListener("click",()=>{
      if(state.completed.has(vocabKey) || card.classList.contains("matched-card")) return;
      const isTerm=card.classList.contains("vocab-term");
      const selector=isTerm?".vocab-term":".vocab-definition";
      section.querySelectorAll(selector).forEach(c=>c.classList.remove("selected-vocab"));
      card.classList.add("selected-vocab");
      if(isTerm) selectedTerm=card; else selectedDefinition=card;

      if(selectedTerm && selectedDefinition){
        if(selectedTerm.dataset.match===selectedDefinition.dataset.match){
          matched.add(selectedTerm.dataset.match);
          selectedTerm.classList.remove("selected-vocab");
          selectedDefinition.classList.remove("selected-vocab");
          selectedTerm.classList.add("matched-card");
          selectedDefinition.classList.add("matched-card");
          feedback.className="feedback vocab-feedback good";
          feedback.textContent="MATCHED — keep going.";
          selectedTerm=null;
          selectedDefinition=null;
          if(matched.size===section.querySelectorAll(".vocab-term").length){
            state.completed.add(vocabKey);
            addXp(25);
            saveProgress();
            markVocabComplete();
          }
        }else{
          const t=selectedTerm,d=selectedDefinition;
          feedback.className="feedback vocab-feedback bad";
          feedback.textContent="Not a match. Try again.";
          t.classList.add("wrong-vocab");d.classList.add("wrong-vocab");
          setTimeout(()=>{t.classList.remove("wrong-vocab","selected-vocab");d.classList.remove("wrong-vocab","selected-vocab");},500);
          selectedTerm=null;selectedDefinition=null;
        }
      }
    });
  });

  next?.addEventListener("click",()=>showModule1Practice());

  const practice=document.getElementById("module1Practice");
  const correct=[0,0,0,0,0,0];
  const rationales=[
    "Temporary capacity is a strong fit for consumption-based cloud usage.",
    "The cloud provider owns and maintains the physical datacenter infrastructure.",
    "Hybrid cloud combines private or on-premises resources with public cloud.",
    "Buying physical infrastructure up front is capital expenditure.",
    "Cloud VMs run on real provider-managed physical hosts.",
    "Infrastructure operated by a third-party cloud provider is public cloud."
  ];
  practice?.querySelectorAll(".assessment-question").forEach(qEl=>{
    qEl.querySelectorAll(".m1-test-answer").forEach(btn=>{
      btn.addEventListener("click",()=>{
        qEl.querySelectorAll(".m1-test-answer").forEach(b=>b.classList.remove("selected-answer"));
        btn.classList.add("selected-answer");
        qEl.dataset.selected=btn.dataset.value;
      });
    });
  });
  document.getElementById("module1PracticeSubmit")?.addEventListener("click",()=>{
    const questions=[...practice.querySelectorAll(".assessment-question")];
    const out=document.getElementById("module1PracticeFeedback");
    if(questions.some(q=>q.dataset.selected===undefined)){
      out.className="feedback bad";
      out.textContent="Answer every question before submitting.";
      return;
    }
    let score=0;
    questions.forEach((q,i)=>{
      const ok=Number(q.dataset.selected)===correct[i];
      if(ok) score++;
      q.classList.toggle("question-correct",ok);
      q.classList.toggle("question-wrong",!ok);
      const r=q.querySelector(".question-rationale");
      if(r) r.textContent=(ok?"✓ ":"✕ ")+rationales[i];
    });
    if(score>=4){
      if(!state.completed.has("m1test")){
        state.completed.add("m1test");
        addXp(50);
      }
      completeModule(1);
      out.className="feedback good";
      out.textContent="PASS — "+score+" / 6. Module 2 unlocked. +50 XP";
      saveProgress();
      setTimeout(()=>showQuest("complete"),700);
    }else{
      out.className="feedback bad";
      out.textContent="Score: "+score+" / 6. Review the rationales and try again.";
    }
  });
})();

// ---------------- GENERATED MODULES 2-12 ----------------
function generatedQuestKey(moduleNumber,index){
  return "m"+moduleNumber+"q"+index;
}
function generatedTestKey(moduleNumber){
  return "m"+moduleNumber+"test";
}
function generatedModuleData(moduleNumber){
  return window.moduleCatalog ? window.moduleCatalog[moduleNumber] : moduleCatalog[moduleNumber];
}
function allGeneratedQuestsComplete(moduleNumber){
  const data=generatedModuleData(moduleNumber);
  return data.quests.every((_,i)=>state.completed.has(generatedQuestKey(moduleNumber,i)));
}
function generatedVocabKey(moduleNumber){
  return "m"+moduleNumber+"vocab";
}
function generatedVocabComplete(moduleNumber){
  return state.completed.has(generatedVocabKey(moduleNumber));
}
function updateGeneratedMap(moduleNumber,activeKind,activeIndex=0){
  const screen=document.getElementById("module"+moduleNumber);
  if(!screen) return;
  const nodes=[...screen.querySelectorAll("[data-gmap]")];
  nodes.forEach((node,i)=>{
    const unlocked=i===0 || state.completed.has(generatedQuestKey(moduleNumber,i-1));
    node.disabled=!unlocked;
    node.classList.toggle("done",state.completed.has(generatedQuestKey(moduleNumber,i)));
    node.classList.toggle("active",activeKind==="quest" && i===activeIndex);
  });
  const vocabNode=screen.querySelector(".vocab-node");
  if(vocabNode){
    const vocabUnlocked=allGeneratedQuestsComplete(moduleNumber);
    vocabNode.disabled=!vocabUnlocked;
    vocabNode.classList.toggle("done",generatedVocabComplete(moduleNumber));
    vocabNode.classList.toggle("active",activeKind==="vocab");
  }
  const testNode=screen.querySelector(".assessment-node");
  if(testNode){
    const testUnlocked=generatedVocabComplete(moduleNumber);
    testNode.disabled=!testUnlocked;
    testNode.classList.toggle("done",state.completedModules.has(moduleNumber));
    testNode.classList.toggle("active",activeKind==="assessment");
  }
}
function showGeneratedQuest(moduleNumber,index,{scroll=true}={}){
  const screen=document.getElementById("module"+moduleNumber);
  if(!screen) return;
  if(index>0 && !state.completed.has(generatedQuestKey(moduleNumber,index-1))) return;

  screen.querySelectorAll(".generated-quest,.module-vocab,.module-assessment,.module-complete-panel").forEach(el=>el.classList.remove("active"));
  const target=screen.querySelector('[data-gquest="'+index+'"]');
  if(!target) return;
  target.classList.add("active");
  localStorage.setItem("certstack-module-"+moduleNumber+"-position","q"+index);
  updateGeneratedMap(moduleNumber,"quest",index);
  const data=generatedModuleData(moduleNumber);
  questLabel.textContent="QUEST "+(index+1)+" / "+data.quests.length;
  const sub=document.querySelector(".subhead");
  if(sub) sub.textContent="Module "+moduleNumber+": "+data.title;
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}
function showGeneratedVocab(moduleNumber,{scroll=true}={}){
  if(!allGeneratedQuestsComplete(moduleNumber)) return;
  const screen=document.getElementById("module"+moduleNumber);
  screen.querySelectorAll(".generated-quest,.module-vocab,.module-assessment,.module-complete-panel").forEach(el=>el.classList.remove("active"));
  const target=screen.querySelector(".module-vocab");
  target.classList.add("active");
  localStorage.setItem("certstack-module-"+moduleNumber+"-position","vocab");
  updateGeneratedMap(moduleNumber,"vocab");
  questLabel.textContent="VOCAB MATCH";
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}

function showGeneratedAssessment(moduleNumber,{scroll=true}={}){
  if(!generatedVocabComplete(moduleNumber)) return;
  const screen=document.getElementById("module"+moduleNumber);
  screen.querySelectorAll(".generated-quest,.module-vocab,.module-assessment,.module-complete-panel").forEach(el=>el.classList.remove("active"));
  const target=screen.querySelector(".module-assessment");
  target.classList.add("active");
  localStorage.setItem("certstack-module-"+moduleNumber+"-position","test");
  updateGeneratedMap(moduleNumber,"assessment");
  questLabel.textContent="EXAM PRACTICE";
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}
function showGeneratedComplete(moduleNumber,{scroll=true}={}){
  const screen=document.getElementById("module"+moduleNumber);
  screen.querySelectorAll(".generated-quest,.module-vocab,.module-assessment,.module-complete-panel").forEach(el=>el.classList.remove("active"));
  const target=screen.querySelector(".module-complete-panel");
  target.classList.add("active");
  localStorage.setItem("certstack-module-"+moduleNumber+"-position","complete");
  updateGeneratedMap(moduleNumber,"complete");
  questLabel.textContent="MODULE COMPLETE";
  if(scroll) window.scrollTo({top:0,behavior:"smooth"});
}
function restoreGeneratedModule(moduleNumber){
  if(state.completedModules.has(moduleNumber)){
    showGeneratedComplete(moduleNumber,{scroll:false});
    return;
  }
  const savedPos=localStorage.getItem("certstack-module-"+moduleNumber+"-position");
  if(savedPos==="test" && generatedVocabComplete(moduleNumber)){
    showGeneratedAssessment(moduleNumber,{scroll:false});
    return;
  }
  if(savedPos==="vocab" && allGeneratedQuestsComplete(moduleNumber)){
    showGeneratedVocab(moduleNumber,{scroll:false});
    return;
  }
  if(savedPos && /^q\d+$/.test(savedPos)){
    const idx=Number(savedPos.slice(1));
    const valid=idx===0 || state.completed.has(generatedQuestKey(moduleNumber,idx-1));
    if(valid){showGeneratedQuest(moduleNumber,idx,{scroll:false});return;}
  }
  const data=generatedModuleData(moduleNumber);
  const firstIncomplete=data.quests.findIndex((_,i)=>!state.completed.has(generatedQuestKey(moduleNumber,i)));
  if(firstIncomplete!==-1) showGeneratedQuest(moduleNumber,firstIncomplete,{scroll:false});
  else if(!generatedVocabComplete(moduleNumber)) showGeneratedVocab(moduleNumber,{scroll:false});
  else showGeneratedAssessment(moduleNumber,{scroll:false});
}
function unlockGenericNextButton(moduleNumber,index){
  const screen=document.getElementById("module"+moduleNumber);
  const quest=screen.querySelector('[data-gquest="'+index+'"]');
  const button=quest?.querySelector(".generic-next");
  if(!button) return;
  button.disabled=false;
  button.classList.remove("locked-btn");
  const data=generatedModuleData(moduleNumber);
  button.textContent=index===data.quests.length-1?"OPEN VOCAB MATCH →":"UNLOCK QUEST "+(index+2)+" →";
}

document.querySelectorAll(".generated-module").forEach(screen=>{
  const moduleNumber=Number(screen.dataset.module);
  const data=generatedModuleData(moduleNumber);

  // Restore buttons for quests already completed in this browser.
  data.quests.forEach((_,i)=>{
    if(state.completed.has(generatedQuestKey(moduleNumber,i))) unlockGenericNextButton(moduleNumber,i);
  });

  screen.querySelectorAll(".generated-quest").forEach(questEl=>{
    const index=Number(questEl.dataset.gquest);
    questEl.querySelectorAll(".generic-choice").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const feedback=questEl.querySelector(".feedback");
        const selected=Number(btn.dataset.answer);
        const q=data.quests[index];
        if(selected===q.correct){
          const key=generatedQuestKey(moduleNumber,index);
          if(!state.completed.has(key)){
            state.completed.add(key);
            addXp(20);
          }
          feedback.className="feedback good";
          feedback.textContent="YES — "+q.why+" +20 XP";
          unlockGenericNextButton(moduleNumber,index);
          saveProgress();
          updateGeneratedMap(moduleNumber,"quest",index);
        }else{
          feedback.className="feedback bad";
          feedback.textContent="Not quite. "+q.why;
        }
      });
    });

    const nextBtn=questEl.querySelector(".generic-next");
    nextBtn.addEventListener("click",()=>{
      if(nextBtn.disabled) return;
      if(index===data.quests.length-1) showGeneratedVocab(moduleNumber);
      else showGeneratedQuest(moduleNumber,index+1);
    });
  });

  screen.querySelectorAll("[data-gmap]").forEach(node=>{
    node.addEventListener("click",()=>showGeneratedQuest(moduleNumber,Number(node.dataset.gmap)));
  });
  const assessmentNode=screen.querySelector(".assessment-node");
  assessmentNode?.addEventListener("click",()=>showGeneratedAssessment(moduleNumber));

  const vocabSection=screen.querySelector(".module-vocab");
  if(vocabSection){
    const vocabKey=generatedVocabKey(moduleNumber);
    const vocabNext=vocabSection.querySelector(".vocab-next");
    const vocabFeedback=vocabSection.querySelector(".vocab-feedback");
    let selectedTerm=null;
    let selectedDefinition=null;
    const matched=new Set();

    function restoreVocabComplete(){
      vocabSection.querySelectorAll(".vocab-card").forEach(card=>card.classList.add("matched-card"));
      if(vocabNext){
        vocabNext.disabled=false;
        vocabNext.classList.remove("locked-btn");
        vocabNext.textContent="OPEN EXAM PRACTICE →";
      }
      if(vocabFeedback){
        vocabFeedback.className="feedback vocab-feedback good";
        vocabFeedback.textContent="VOCAB CLEARED — all terms matched.";
      }
    }

    if(state.completed.has(vocabKey)) restoreVocabComplete();

    vocabSection.querySelectorAll(".vocab-card").forEach(card=>{
      card.addEventListener("click",()=>{
        if(state.completed.has(vocabKey) || card.classList.contains("matched-card")) return;
        const isTerm=card.classList.contains("vocab-term");
        const group=isTerm?"term":"definition";
        vocabSection.querySelectorAll(".vocab-"+group).forEach(c=>c.classList.remove("selected-vocab"));
        card.classList.add("selected-vocab");
        if(isTerm) selectedTerm=card; else selectedDefinition=card;

        if(selectedTerm && selectedDefinition){
          if(selectedTerm.dataset.match===selectedDefinition.dataset.match){
            const matchId=selectedTerm.dataset.match;
            matched.add(matchId);
            selectedTerm.classList.remove("selected-vocab");
            selectedDefinition.classList.remove("selected-vocab");
            selectedTerm.classList.add("matched-card");
            selectedDefinition.classList.add("matched-card");
            vocabFeedback.className="feedback vocab-feedback good";
            vocabFeedback.textContent="MATCHED — keep going.";
            selectedTerm=null;
            selectedDefinition=null;

            const total=vocabSection.querySelectorAll(".vocab-term").length;
            if(matched.size===total){
              state.completed.add(vocabKey);
              addXp(25);
              saveProgress();
              restoreVocabComplete();
              updateGeneratedMap(moduleNumber,"vocab");
            }
          }else{
            vocabFeedback.className="feedback vocab-feedback bad";
            vocabFeedback.textContent="Not a match. Try those two again.";
            const wrongTerm=selectedTerm;
            const wrongDef=selectedDefinition;
            wrongTerm.classList.add("wrong-vocab");
            wrongDef.classList.add("wrong-vocab");
            setTimeout(()=>{
              wrongTerm.classList.remove("wrong-vocab","selected-vocab");
              wrongDef.classList.remove("wrong-vocab","selected-vocab");
            },500);
            selectedTerm=null;
            selectedDefinition=null;
          }
        }
      });
    });

    vocabNext?.addEventListener("click",()=>showGeneratedAssessment(moduleNumber));
  }

  screen.querySelector(".vocab-node")?.addEventListener("click",()=>showGeneratedVocab(moduleNumber));

  screen.querySelectorAll(".assessment-question").forEach(qEl=>{
    qEl.querySelectorAll(".test-answer").forEach(btn=>{
      btn.addEventListener("click",()=>{
        qEl.querySelectorAll(".test-answer").forEach(b=>b.classList.remove("selected-answer"));
        btn.classList.add("selected-answer");
        qEl.dataset.selected=btn.dataset.value;
      });
    });
  });

  screen.querySelector(".submit-module-test")?.addEventListener("click",()=>{
    const feedback=screen.querySelector(".module-test-feedback");
    const questions=[...screen.querySelectorAll(".assessment-question")];
    if(questions.some(q=>q.dataset.selected===undefined)){
      feedback.className="feedback bad";
      feedback.textContent="Answer every question before submitting.";
      return;
    }
    const practice=typeof getPracticeQuestions==="function"?getPracticeQuestions(moduleNumber,data):data.assessment;
    let score=0;
    questions.forEach((qEl,i)=>{
      const selected=Number(qEl.dataset.selected);
      const correct=practice[i][2];
      const rationale=practice[i][3] || "Review the matching learning concept above.";
      const r=qEl.querySelector(".question-rationale");
      if(selected===correct){
        score++;
        qEl.classList.add("question-correct");
        qEl.classList.remove("question-wrong");
        if(r) r.textContent="✓ "+rationale;
      }else{
        qEl.classList.add("question-wrong");
        qEl.classList.remove("question-correct");
        if(r) r.textContent="✕ "+rationale;
      }
    });
    const needed=Math.ceil(questions.length*2/3);
    if(score>=needed){
      const testKey=generatedTestKey(moduleNumber);
      if(!state.completed.has(testKey)){
        state.completed.add(testKey);
        addXp(50);
      }
      completeModule(moduleNumber);
      feedback.className="feedback good";
      feedback.textContent="PASS — "+score+" / "+questions.length+". Module "+(moduleNumber<12?moduleNumber+1:"course completion")+" unlocked. +50 XP";
      saveProgress();
      setTimeout(()=>showGeneratedComplete(moduleNumber),700);
    }else{
      feedback.className="feedback bad";
      feedback.textContent="Score: "+score+" / "+questions.length+". Review the rationales, go back to learning if needed, and try again.";
    }
  });

  screen.querySelector(".go-next-module")?.addEventListener("click",()=>{
    if(moduleNumber<12) showModule("module"+(moduleNumber+1));
    else window.scrollTo({top:0,behavior:"smooth"});
  });
  screen.querySelector(".replay-generated-module")?.addEventListener("click",()=>showGeneratedQuest(moduleNumber,0));
});

// Enhance module switching so every unlocked module returns to its saved place.
const originalShowModule=showModule;
showModule=function(moduleId,options={}){
  const number=Number(moduleId.replace("module",""));
  if(!state.unlockedModules.has(number)) return;
  originalShowModule(moduleId,options);
  if(number>=2) restoreGeneratedModule(number);
};

document.querySelectorAll(".module-card[data-module-jump]").forEach(btn=>{
  // Replace the earlier listener's practical effect with the gated state above.
  btn.addEventListener("click",()=>showModule(btn.dataset.moduleJump));
});

// Initial restoration for generated modules if the visitor last left there.
if(state.activeModule>=2 && state.unlockedModules.has(state.activeModule)){
  showModule("module"+state.activeModule,{scroll:false});
}

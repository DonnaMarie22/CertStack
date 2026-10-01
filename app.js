const state={
  xp:Number(localStorage.getItem("certstack-xp")||0),
  level:Number(localStorage.getItem("certstack-level")||1),
  completed:new Set()
};

const quests=["cloud","shared","models","cost"];
const questLabel=document.getElementById("questLabel");
const xpBar=document.getElementById("xpBar");
const xpLabel=document.getElementById("xpLabel");
const levelLabel=document.getElementById("levelLabel");

function renderStats(){
  const into=state.xp%100;
  levelLabel.textContent="LVL "+state.level;
  xpLabel.textContent=into+" / 100 XP";
  xpBar.style.width=into+"%";
}
function addXp(amount){
  state.xp+=amount;
  state.level=Math.floor(state.xp/100)+1;
  localStorage.setItem("certstack-xp",state.xp);
  localStorage.setItem("certstack-level",state.level);
  renderStats();
}
function showQuest(id){
  document.querySelectorAll(".quest").forEach(q=>q.classList.toggle("active",q.id===id));
  const idx=quests.indexOf(id);
  questLabel.textContent=id==="complete"?"MODULE COMPLETE":"QUEST "+(idx+1)+" / 4";
  document.querySelectorAll(".map-node").forEach((n,i)=>{
    n.classList.toggle("active",i===idx);
    n.classList.toggle("done",i<idx || state.completed.has(quests[i]));
    if(i<=idx)n.disabled=false;
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
function success(feedback,message,button,quest,xp){
  if(!state.completed.has(quest)){
    state.completed.add(quest);
    addXp(xp);
  }
  feedback.className="feedback good";
  feedback.textContent=message+" +"+xp+" XP";
  button.classList.remove("hidden");
}
function fail(feedback,message){
  feedback.className="feedback bad";
  feedback.textContent=message;
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

document.getElementById("finishBtn").addEventListener("click",()=>showQuest("complete"));
document.getElementById("replayBtn").addEventListener("click",()=>showQuest("cloud"));
document.querySelectorAll(".map-node").forEach((btn,i)=>btn.addEventListener("click",()=>{if(!btn.disabled)showQuest(quests[i]);}));
renderStats();

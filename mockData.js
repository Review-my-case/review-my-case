export const MOCK_CASES = [
  { id:'c1', name:'Marcus T.', initials:'MT', country:'Nigeria', state:'Lagos', category:'Wrongful Conviction', score:82, urgency:'immediate', status:'pending', date:'Jan 15, 2026', story:'Falsely accused by sister-in-law. Spent 543 days in custody. Assets sold without consent during incarceration.', violations:[{type:'False Imprisonment',severity:'High'},{type:'Financial Fraud',severity:'High'},{type:'Asset Theft',severity:'High'}], hasFiles:true, filesCount:6 },
  { id:'c2', name:'Amara J.', initials:'AJ', country:'United States', state:'Texas', category:'Police Misconduct', score:71, urgency:'soon', status:'reviewing', date:'Jan 18, 2026', story:'Unlawful search and seizure. Evidence planted. Case dismissed but no accountability.', violations:[{type:'4th Amendment Violation',severity:'High'},{type:'Excessive Force',severity:'Medium'}], hasFiles:true, filesCount:3 },
  { id:'c3', name:'David O.', initials:'DO', country:'United Kingdom', state:'Manchester', category:'Employment Injustice', score:55, urgency:'standard', status:'matched', date:'Jan 20, 2026', story:'Wrongful termination after whistleblowing. HR covered it up.', violations:[{type:'Wrongful Termination',severity:'Medium'},{type:'Retaliation',severity:'Medium'}], hasFiles:false, filesCount:0 },
  { id:'c4', name:'Fatima K.', initials:'FK', country:'Ghana', state:'Accra', category:'Civil Rights Violation', score:67, urgency:'soon', status:'pending', date:'Jan 21, 2026', story:'Detained without charge for 3 weeks. No access to lawyer during detention.', violations:[{type:'Unlawful Detention',severity:'High'},{type:'Right to Counsel Denied',severity:'High'}], hasFiles:true, filesCount:4 },
  { id:'c5', name:'Jerome W.', initials:'JW', country:'Jamaica', state:'Kingston', category:'False Accusation', score:44, urgency:'standard', status:'closed', date:'Jan 10, 2026', story:'Accused by neighbor in land dispute. No evidence provided.', violations:[{type:'Malicious Prosecution',severity:'Medium'}], hasFiles:false, filesCount:0 },
];

export const MOCK_LAWYERS = [
  { id:'l1', name:'Sarah Okonkwo', spec:'Criminal Defense / Appeals', country:'Nigeria', cases:14, rating:4.9, status:'active', earnings:3200, joined:'Nov 2023', avatar:'SO' },
  { id:'l2', name:'James Miller', spec:'Civil Rights / Wrongful Conviction', country:'United States', cases:22, rating:4.8, status:'active', earnings:7800, joined:'Sep 2023', avatar:'JM' },
  { id:'l3', name:'Priya Sharma', spec:'Employment Law', country:'United Kingdom', cases:9, rating:4.7, status:'active', earnings:2100, joined:'Jan 2024', avatar:'PS' },
  { id:'l4', name:'Kwame Asante', spec:'Human Rights / Criminal', country:'Ghana', cases:6, rating:4.9, status:'pending', earnings:0, joined:'Jan 2024', avatar:'KA' },
];

export const MOCK_USER = {
  name:'Marcus Thompson', email:'marcus.t@email.com', country:'Nigeria',
  joined:'January 2026', initials:'MT',
  cases:[
    { id:'c1', title:'Wrongful Conviction — Asset Theft', status:'reviewing', score:82, date:'Jan 15, 2026', lawyer:'Sarah Okonkwo' },
    { id:'cx', title:'Bank Account Removal', status:'pending', score:61, date:'Jan 22, 2026', lawyer:null },
  ],
  documents:['Arrest record.pdf','Bail denial notice.pdf','Property deed.pdf','Bank statement.pdf'],
  notifications:[
    { id:'n1', text:'Sarah Okonkwo accepted your case', time:'2 hours ago', read:false },
    { id:'n2', text:'Your Justice Score updated to 82', time:'1 day ago', read:false },
    { id:'n3', text:'New evidence gap identified in your timeline', time:'2 days ago', read:true },
  ]
};

export const CATEGORIES = [
  { id:'wrongful_conviction', label:'Wrongful Conviction', icon:'🔒' },
  { id:'false_accusation', label:'False Accusation', icon:'📋' },
  { id:'civil_rights', label:'Civil Rights', icon:'✊' },
  { id:'police_misconduct', label:'Police Misconduct', icon:'⚠️' },
  { id:'asset_theft', label:'Property Theft', icon:'🏠' },
  { id:'custody', label:'Child Custody', icon:'👶' },
  { id:'employment', label:'Employment', icon:'💼' },
  { id:'domestic', label:'Domestic Violence', icon:'🛡️' },
  { id:'fraud', label:'Fraud', icon:'💳' },
  { id:'land', label:'Land Dispute', icon:'📍' },
  { id:'human_rights', label:'Human Rights', icon:'🌍' },
  { id:'other', label:'Other', icon:'❓' },
];

export const STATUS_OPTIONS = [
  { id:'in_custody', label:'Currently in custody', icon:'🔴' },
  { id:'awaiting_trial', label:'Awaiting trial', icon:'🟡' },
  { id:'convicted', label:'Already convicted / sentenced', icon:'🟠' },
  { id:'bail', label:'Out on bail', icon:'🟡' },
  { id:'charged', label:'Charged, no court date yet', icon:'⚖️' },
  { id:'released', label:'Released — seeking appeal', icon:'🟢' },
  { id:'civil', label:'Civil matter — no arrest', icon:'📋' },
];

export const EXPERTS = [
  { id:'public_defender', name:'Public Defender', tag:'Free', color:'#10b981', icon:'🏛️', spec:'Criminal Defense', desc:'Court-appointed attorneys for qualifying individuals. Available across the US, UK, and many Commonwealth countries.', cta:'Check Eligibility' },
  { id:'innocence_project', name:'Innocence Project', tag:'Free', color:'#9d7fe8', icon:'🔬', spec:'Wrongful Convictions', desc:'Reviews cases using DNA and forensic evidence at no cost. Strong global track record.', cta:'Submit Case' },
  { id:'aclu', name:'ACLU / Civil Liberties Union', tag:'Free', color:'#60a5fa', icon:'⚖️', spec:'Civil Rights & Misconduct', desc:'Handles constitutional violations, police misconduct, and discrimination.', cta:'Contact ACLU' },
  { id:'legal_aid', name:'Legal Aid Societies', tag:'Free', color:'#f59e0b', icon:'🤝', spec:'All Civil Matters', desc:'Free civil legal help for low-income individuals. Housing, family, employment, benefits.', cta:'Find Local Aid' },
  { id:'pro_bono', name:'Pro Bono Networks', tag:'Free', color:'#34d399', icon:'📋', spec:'Volunteer Attorneys', desc:'Law firms required to contribute pro bono hours. Many take wrongful conviction and civil rights cases.', cta:'Get Matched' },
  { id:'contingency', name:'Contingency Attorneys', tag:'No Win, No Fee', color:'#c9a84c', icon:'📜', spec:'Civil Claims & Recovery', desc:'Private attorneys paid only when you win. Best for asset recovery and civil rights damages.', cta:'Find Attorney' },
  { id:'journalist', name:'Investigative Journalists', tag:'Case Dependent', color:'#f472b6', icon:'📰', spec:'Public Interest Cases', desc:'For cases involving systemic abuse or official corruption. Media attention accelerates justice.', cta:'Submit Story' },
  { id:'human_rights_org', name:'Human Rights Organizations', tag:'Free', color:'#a78bfa', icon:'🌍', spec:'International / Systemic Abuse', desc:'Amnesty International, Human Rights Watch, and regional bodies handle broader human rights cases.', cta:'Contact Org' },
];

export const SUPPORT_FAQS = [
  { q:'Is Review My Case a law firm?', a:'No. We are a legal intake and case organization platform. We never give legal advice or determine guilt or innocence. We connect you with licensed professionals who can.' },
  { q:'How much does this cost?', a:'Submitting and reviewing your case is completely free. Many of the legal experts we connect you with are also free or work on a no-win-no-fee basis.' },
  { q:'Is my information private?', a:'Yes. Your case details are encrypted and only shared with legal professionals when you choose to connect with them. We never sell your information.' },
  { q:'What is a Justice Score?', a:'A 0–100 rating showing how strongly your case appears to merit further legal review based on factors like documentation, procedural concerns, and consistency. It is not a prediction of winning.' },
  { q:'What happens after I submit my case?', a:'Our AI reviews your story and documents, then generates a case report. From there, you can connect directly with a legal expert who matches your situation.' },
  { q:'Can lawyers see my case before I choose them?', a:'Lawyers see an anonymized summary first. Your full name and contact details are only shared once you choose to connect with a specific professional.' },
];

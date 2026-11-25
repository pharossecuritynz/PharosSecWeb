/**
 * Pharos guides. Plain data, rendered by app/resources/[slug]/page.tsx.
 *
 * Content rules (CLAUDE.md): no em dashes, NZ spelling, no invented
 * statistics. Every figure below was checked against its original source
 * on 2026-11-25; see 08_Website/website-review-2026-11.md for the exact
 * wording verified. If a source changes, update the article, not just the
 * link.
 *
 * STATUS: AI-assisted drafts awaiting Jason Hill's review (CLAUDE.md
 * rule 6). Do not deploy until reviewed.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "qa"; items: { q: string; a: string }[] }
  | { type: "callout"; text: string };

export interface Section {
  heading?: string;
  blocks: Block[];
}

export interface Source {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  readingMinutes: number;
  sections: Section[];
  sources: Source[];
  next: { label: string; href: string; text: string };
}

export const SOURCES = {
  ukNcscAgentic: {
    label:
      "UK National Cyber Security Centre, “Familiar weaknesses, exploited faster: defending against agentic cyber attacks” (24 November 2026)",
    url: "https://www.ncsc.gov.uk/blogs/familiar-weaknesses-exploited-faster-defending-against-agentic-cyber-attacks",
  },
  unit42: {
    label: "Palo Alto Networks Unit 42, 2026 Global Incident Response Report",
    url: "https://www.paloaltonetworks.com/resources/research/unit-42-incident-response-report",
  },
  nzNcscControls: {
    label: "New Zealand National Cyber Security Centre, Critical Controls",
    url: "https://www.ncsc.govt.nz/protect-your-organisation/summary/",
  },
  cisIg1: {
    label: "Center for Internet Security, CIS Controls Implementation Group 1",
    url: "https://www.cisecurity.org/controls/implementation-groups/ig1",
  },
  nzNcscSurvey: {
    label:
      "New Zealand National Cyber Security Centre, “More than half of New Zealand businesses experiencing cyber threats” (4 September 2025)",
    url: "https://www.ncsc.govt.nz/news/more-than-half-of-new-zealand-businesses-experiencing-cyber-threats/",
  },
  privacyCommissioner: {
    label: "Office of the Privacy Commissioner",
    url: "https://www.privacy.org.nz/",
  },
} satisfies Record<string, Source>;

const CHECKLIST_NEXT = {
  label: "Free security foundations checklist",
  href: "/resources/security-foundations-checklist",
  text: "Ten plain-English questions covering the areas that matter most. About ten minutes, and nothing you select leaves your browser.",
};

export const articles: Article[] = [
  {
    slug: "ai-cyberattacks-what-nz-businesses-need-to-know",
    title: "AI-powered cyberattacks: what New Zealand businesses actually need to know",
    description:
      "AI is making cyberattacks faster and cheaper to run. What has changed, what hasn't, and the practical steps that still make the biggest difference for a small business.",
    published: "2026-11-25",
    readingMinutes: 7,
    sections: [
      {
        blocks: [
          {
            type: "p",
            text: "You've probably seen headlines about AI being used to attack businesses. Some of it is exaggerated. Some of it is real and worth understanding. This guide sets out what the evidence shows, what it means for a business with somewhere between a handful and fifty staff, and what is worth doing about it.",
          },
        ],
      },
      {
        heading: "What has actually changed",
        blocks: [
          {
            type: "p",
            text: "In November 2026 the UK's National Cyber Security Centre reported a marked rise, since September 2026, in attacks carried out with “agentic” tools. These are AI systems that can work through the steps of an attack largely on their own: finding systems exposed to the internet, testing them for weaknesses and trying to get in, without a person directing each step.",
          },
          {
            type: "p",
            text: "One framework, ARTEX, has become closely associated with this activity. It was originally built for authorised security testing, the kind of work organisations commission to find their own weaknesses. Attackers are now running tools like it against real targets, often paired with cheap AI models.",
          },
          {
            type: "p",
            text: "The UK NCSC's point is not that these tools have found new ways in. It is that they make attacks faster, more persistent and cheaper to run. An automated tool doesn't get bored, doesn't need to sleep, and can try the same thing against a very large number of businesses at once.",
          },
          {
            type: "p",
            text: "AI also helps attackers in more familiar ways, such as writing convincing phishing emails without the spelling and grammar mistakes people were once told to look for. A professional-looking message is no longer a sign that it's genuine.",
          },
        ],
      },
      {
        heading: "What hasn't changed",
        blocks: [
          {
            type: "p",
            text: "This is the more useful part. The UK NCSC found that none of the weaknesses being exploited were new. The tools were finding:",
          },
          {
            type: "list",
            items: [
              "passwords, keys and other credentials accidentally left in code or configuration files",
              "default passwords that were never changed, or systems with no sign-in protection at all",
              "misconfigured cloud and infrastructure settings",
              "poorly protected APIs, the connections that let software systems talk to each other",
              "accounts with far more access than they need, on networks with little separation between systems",
            ],
          },
          {
            type: "p",
            text: "In the UK NCSC's own words: “Nearly everything the NCSC has seen can be prevented by implementing cyber security best practice.”",
          },
          {
            type: "p",
            text: "Other research points the same way. Palo Alto Networks' Unit 42 team responded to more than 750 major incidents in 2025. In over 90% of the breaches they investigated, preventable gaps such as limited visibility, inconsistently applied controls or excessive account access materially enabled the intrusion.",
          },
          {
            type: "callout",
            text: "A note on that figure: it describes serious incidents a specialist response team was called in to handle. It does not mean 90% of all cyberattacks are preventable, and no set of controls removes all risk. What it does show is that incidents which cause real damage very often run through gaps that could have been closed.",
          },
        ],
      },
      {
        heading: "What this means for a business your size",
        blocks: [
          {
            type: "p",
            text: "You are unlikely to be singled out by a skilled attacker with a plan for your business in particular. You are quite likely to be found by an automated tool scanning the internet for anything that looks easy. That changes the question from “would anyone target us?” to “is there anything easy to find?”",
          },
          {
            type: "p",
            text: "It also shortens the time you have. A forgotten remote access system, or an account without multi-factor authentication, might once have sat unnoticed for months. Automated tools make it more likely that someone finds it sooner.",
          },
        ],
      },
      {
        heading: "What to do about it",
        blocks: [
          {
            type: "p",
            text: "Most of the useful work is configuration and habit, not new products. In rough order of where small businesses usually get the most benefit:",
          },
          {
            type: "list",
            items: [
              "Know what you expose to the internet. Ask your IT provider for a list of every system that can be reached from outside, and remove or protect anything that doesn't need to be there.",
              "Make multi-factor authentication required, not optional, for every account, especially email and administrator accounts, with no quiet exceptions.",
              "Give staff a password manager, so nobody needs to reuse passwords between work and personal accounts.",
              "Keep software and devices up to date, and replace anything that no longer receives security updates.",
              "Limit administrator access to the few people who need it, using separate admin accounts.",
              "Test that you can restore from your backups, not just that they run.",
              "Agree in advance who you would call and what you would do if something went wrong.",
            ],
          },
          {
            type: "p",
            text: "These overlap closely with New Zealand's NCSC Critical Controls, a top-ten list the NCSC reviews each year against the incidents it sees. They are a sensible, locally relevant place to start.",
          },
        ],
      },
      {
        heading: "What not to do",
        blocks: [
          {
            type: "p",
            text: "Don't let an alarming headline push you into buying a product you don't understand. A new security tool that is only half set up can leave you no safer than before, and sometimes less safe, because it creates the feeling that the problem is handled. AI-based defence tools have their place, but the UK NCSC is clear that they are “not the sole answer to agentic attacks”.",
          },
          {
            type: "p",
            text: "Start with what you already have. Most businesses on Microsoft 365 or Google Workspace already pay for security features they haven't fully switched on.",
          },
        ],
      },
    ],
    sources: [SOURCES.ukNcscAgentic, SOURCES.unit42, SOURCES.nzNcscControls],
    next: CHECKLIST_NEXT,
  },

  {
    slug: "having-mfa-is-not-enforcing-mfa",
    title: "Why having MFA isn't the same as enforcing MFA",
    description:
      "Multi-factor authentication is one of the most effective protections a small business can have. Why “we have MFA” often means less than it sounds, and how to check.",
    published: "2026-11-25",
    readingMinutes: 6,
    sections: [
      {
        blocks: [
          {
            type: "p",
            text: "Ask most businesses whether they use multi-factor authentication (MFA) and they'll say yes. Ask whether every account is required to use it, every time, with no exceptions, and the answer is often less certain. The gap between those two answers is where a lot of account compromises happen.",
          },
        ],
      },
      {
        heading: "Why MFA matters so much",
        blocks: [
          {
            type: "p",
            text: "MFA means a password alone isn't enough to sign in. Someone also needs a code, an approval on a phone or a physical key. Passwords get stolen through phishing, reused across websites and leaked when other services are breached. MFA is what stops a stolen password from becoming a stolen account.",
          },
          {
            type: "p",
            text: "New Zealand's NCSC lists MFA among its ten Critical Controls, noting that it sees many reports of unauthorised access often caused by weak credentials. Unit 42's 2026 incident response report found that identity-based techniques drove 65% of initial access in the incidents it investigated.",
          },
        ],
      },
      {
        heading: "Five ways “we have MFA” can fall short",
        blocks: [
          {
            type: "qa",
            items: [
              {
                q: "It's available, not required.",
                a: "Staff were invited to set it up and most did. A few didn't, and nothing forces them to.",
              },
              {
                q: "There are exceptions nobody remembers.",
                a: "A shared mailbox, an old service account, a senior person's account because MFA was “annoying”, or a former contractor's account that was never removed.",
              },
              {
                q: "Older sign-in methods still work.",
                a: "Some older email apps and connection methods can't use MFA at all. If they're still allowed, someone with a password may be able to use them to go around MFA entirely.",
              },
              {
                q: "It's on for email, but not for everything else.",
                a: "Accounting software, payroll, online banking, remote access, the website admin panel and your domain registrar all matter too.",
              },
              {
                q: "Prompts get approved out of habit.",
                a: "If someone gets an unexpected sign-in request and taps “approve” to make it go away, MFA hasn't helped. Attackers rely on this by sending repeated prompts until one is accepted.",
              },
            ],
          },
        ],
      },
      {
        heading: "How to check where you stand",
        blocks: [
          {
            type: "p",
            text: "You don't need to check this yourself, but you should be able to get clear answers from whoever manages your IT:",
          },
          {
            type: "list",
            items: [
              "Is MFA enforced for every user account, or just available?",
              "Which accounts are excluded, and is there an agreed reason for each one?",
              "Are older sign-in methods that can't use MFA blocked?",
              "Which other business systems (accounting, payroll, banking, remote access, website, domain) have MFA turned on?",
              "Do administrator accounts use a stronger method, such as an authenticator app with number matching or a physical security key?",
            ],
          },
          {
            type: "p",
            text: "In Microsoft 365, most of these settings sit in Conditional Access policies or Security Defaults, and your IT provider will know where to look. If the answer to any question is “I'll need to check”, that's fine. The point is that someone checks.",
          },
        ],
      },
      {
        heading: "Stronger is better",
        blocks: [
          {
            type: "p",
            text: "Not all MFA is equal. Text message codes are better than nothing but can be intercepted or redirected. Authenticator apps are stronger, especially with number matching. Passkeys and physical security keys are stronger again: they resist phishing because they won't work on a fake sign-in page. The UK NCSC recommends phishing-resistant authentication wherever possible.",
          },
          {
            type: "p",
            text: "For most small businesses, a practical goal is: everyone on an authenticator app, administrators on something stronger, and no exceptions without a written reason.",
          },
        ],
      },
      {
        heading: "The business view",
        blocks: [
          {
            type: "p",
            text: "Email account compromise is a common route to invoice fraud. Someone gets into a mailbox, watches conversations and changes the bank details on a real invoice at the right moment. Consistently enforced MFA makes that much harder. It costs little, and most businesses already pay for it.",
          },
          {
            type: "p",
            text: "MFA has a companion that matters just as much: verification. A call to a known phone number before anyone's bank details are changed stops many fraud attempts that technology alone would miss. New Zealand's NCSC groups the two together in the same Critical Control for that reason.",
          },
        ],
      },
    ],
    sources: [SOURCES.nzNcscControls, SOURCES.unit42, SOURCES.ukNcscAgentic],
    next: CHECKLIST_NEXT,
  },

  {
    slug: "questions-to-ask-your-it-provider",
    title: "Ten security questions to ask your IT provider",
    description:
      "Good IT providers welcome good questions. Ten plain-English questions that help you understand how your business is protected, and what to do with the answers.",
    published: "2026-11-25",
    readingMinutes: 6,
    sections: [
      {
        blocks: [
          {
            type: "p",
            text: "Most small businesses rely on an IT provider for security, often without a clear picture of what is and isn't included. That isn't a criticism of anyone. IT providers are usually engaged to keep systems running, and security responsibilities can be assumed on both sides without ever being written down.",
          },
          {
            type: "p",
            text: "These questions are meant to start a constructive conversation, not to catch anyone out. A good provider will be glad you asked.",
          },
        ],
      },
      {
        heading: "The ten questions",
        blocks: [
          {
            type: "qa",
            items: [
              {
                q: "Which of our systems can be reached from the internet, and does each one need to be?",
                a: "Anything reachable from the internet will be found by automated scanning tools. The safest service is one that isn't exposed at all.",
              },
              {
                q: "Is multi-factor authentication enforced for every account, and what are the exceptions?",
                a: "“Available” and “enforced” are different things. Exceptions are where problems tend to hide.",
              },
              {
                q: "How quickly are security updates applied, and is anything we use no longer supported?",
                a: "Unsupported software and devices stop receiving fixes, and they are a common way in.",
              },
              {
                q: "Who has administrator access, and do they use separate accounts for it?",
                a: "Administrator accounts are the most valuable to an attacker. Fewer, separate, well-protected admin accounts limit what one stolen password can do.",
              },
              {
                q: "Is security software installed and reporting on every device, including laptops that rarely come into the office?",
                a: "Protection on most devices still leaves the rest open. Coverage gaps are common and easy to miss.",
              },
              {
                q: "When did we last test restoring from backup, and how long did it take?",
                a: "A backup that has never been restored is an assumption. The restore time tells you how long you'd be without your systems.",
              },
              {
                q: "Are our Microsoft 365 or Google Workspace emails and files backed up separately?",
                a: "These services keep your data available, but their built-in retention isn't always the same as a backup you control.",
              },
              {
                q: "What security events are logged, who looks at them, and how would we hear about a problem?",
                a: "Logs only help if someone reviews them or is alerted. It's worth knowing what's watched, by whom and when.",
              },
              {
                q: "Which other companies have access to our systems, and how is that access controlled?",
                a: "Software vendors, contractors and former providers often keep access for longer than they need it.",
              },
              {
                q: "If we had a cyber incident tomorrow, what would you do, what would we need to do, and what isn't covered?",
                a: "The middle of an incident is the worst time to find out who does what. Knowing the boundaries in advance saves time and money.",
              },
            ],
          },
        ],
      },
      {
        heading: "What to do with the answers",
        blocks: [
          {
            type: "p",
            text: "You don't need to understand every technical detail. Listen for clear, specific answers. “Yes, enforced for everyone except the scanner account, which can only sign in from the office network” is a good answer. “We should be fine” is a reason to ask a follow-up question.",
          },
          {
            type: "p",
            text: "Some answers will show things that aren't in your current agreement. That's normal and useful. It lets you decide deliberately what you want covered, rather than finding out during an incident.",
          },
          {
            type: "p",
            text: "If you'd like an independent view of the answers, that's what our IT Provider Security Assurance review is for. It is designed to work alongside your provider, not against them.",
          },
        ],
      },
    ],
    sources: [SOURCES.nzNcscControls, SOURCES.ukNcscAgentic, SOURCES.cisIg1],
    next: {
      label: "IT Provider Security Assurance",
      href: "/it-provider-security-assurance",
      text: "An independent check of what your IT provider covers, framed to help the relationship rather than test it.",
    },
  },

  {
    slug: "could-your-business-recover-from-ransomware",
    title: "How to know whether your business could recover from ransomware",
    description:
      "Having backups and being able to recover are not the same thing. Practical questions to test whether your business could get back on its feet after ransomware.",
    published: "2026-11-25",
    readingMinutes: 6,
    sections: [
      {
        blocks: [
          {
            type: "p",
            text: "Ransomware locks a business's data, steals it, or both, and then demands payment. How well a business comes through it usually depends on a question best answered before it happens: can we get our systems and data back, and how quickly?",
          },
          {
            type: "p",
            text: "Most businesses have backups. Far fewer have tested whether those backups would work when it mattered. New Zealand's NCSC includes “implement and test backups” among its ten Critical Controls, and the word “test” is there for a reason.",
          },
        ],
      },
      {
        heading: "Why backups fail when they're needed",
        blocks: [
          {
            type: "list",
            items: [
              "They were connected to the same network, or used the same administrator account, so the attacker encrypted or deleted them too.",
              "They were running but quietly failing, and nobody was reading the reports.",
              "They covered the server, but not the laptops, the cloud services or the accounting system.",
              "They worked, but restoring everything took far longer than the business could afford to be offline.",
              "Nobody knew how to restore them, or the one person who did was unavailable.",
            ],
          },
        ],
      },
      {
        heading: "Five questions to ask",
        blocks: [
          {
            type: "qa",
            items: [
              {
                q: "Is at least one copy of our backups kept somewhere an attacker on our network couldn't reach or change?",
                a: "This is often called an offline or immutable copy. It is what protects you if an attacker gets administrator access.",
              },
              {
                q: "When did we last do a real test restore, and what did we restore?",
                a: "Restoring a whole critical system tells you far more than restoring a single file.",
              },
              {
                q: "How long would it take to get our most important systems working again?",
                a: "Ask for an honest estimate, then ask whether the business could keep operating for that long.",
              },
              {
                q: "How much data could we lose?",
                a: "If backups run nightly, you could lose up to a day of work. Is that acceptable for your invoicing, client records and payroll?",
              },
              {
                q: "Are our cloud services, such as Microsoft 365, included?",
                a: "Built-in retention helps, but it isn't always enough to recover from deliberate deletion or a compromised account.",
              },
            ],
          },
        ],
      },
      {
        heading: "Recovery is more than restoring files",
        blocks: [
          {
            type: "p",
            text: "Restoring data is one part of recovering. You'll also want to know, in advance:",
          },
          {
            type: "list",
            items: [
              "who decides whether to shut systems down, and who you call first: your IT provider, your insurer, and possibly a specialist incident response firm",
              "how you'll reach staff and clients if email is unavailable",
              "whether personal information may have been accessed. Under the Privacy Act 2020, a breach likely to cause serious harm must be notified to the Privacy Commissioner and affected people, so it's worth getting proper advice quickly",
              "what your cyber insurance policy requires you to do, and how quickly",
            ],
          },
          {
            type: "p",
            text: "None of this needs to be elaborate. A one or two page plan with names and phone numbers, printed and kept somewhere other than the systems it's meant to recover, is far better than nothing. Incidents can also be reported to New Zealand's NCSC at ncsc.govt.nz/report.",
          },
        ],
      },
      {
        heading: "A realistic goal",
        blocks: [
          {
            type: "p",
            text: "No business can guarantee it won't be affected. A realistic goal is this: if it happened tomorrow, you'd know who to call, you'd have a copy of your data the attacker couldn't touch, and you'd have a tested estimate of how long recovery would take. That's achievable for most small businesses, usually without buying anything new.",
          },
        ],
      },
    ],
    sources: [SOURCES.nzNcscControls, SOURCES.privacyCommissioner],
    next: CHECKLIST_NEXT,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

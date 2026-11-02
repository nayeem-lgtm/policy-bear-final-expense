export type LegalBlock = { kind: "paragraph" | "subheading"; text: string } | { kind: "list" | "ordered" | "grid"; items: string[] } | { kind: "details"; rows: string[][] } | { kind: "table"; headers: string[]; rows: string[][] }
export type LegalDocument = { title: string; date: string; intro: string[]; sections: { title: string; blocks: LegalBlock[] }[] }

export const legalDocuments: Record<"privacy" | "terms" | "disclaimer" | "licensing" | "disclosure", LegalDocument> = {
  "privacy": {
    "title": "Privacy Policy",
    "date": "Effective date: October 9, 2026 · Last updated: October 9, 2026",
    "intro": [
      "Policy Bear (\"we,\" \"us,\" or \"our\") is a licensed insurance agency based in Las Vegas, Nevada. This Privacy Policy explains what personal information we collect when you visit policybear.com, request a quote, call us, or apply for life insurance; how we use and share it; and the choices and rights you have. It applies to information collected online, by phone, by text message and by email.",
      "By using our website or giving us your information, you acknowledge this Privacy Policy. If you do not agree, please do not use the website and call us at (844) POL-BEAR instead."
    ],
    "sections": [
      {
        "title": "Who we are and how to reach us",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Business: Policy Bear, a licensed insurance agency, Nevada license 4121356, NPN 21624946"
          },
          {
            "kind": "paragraph",
            "text": "Address: 222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145"
          },
          {
            "kind": "paragraph",
            "text": "Phone: (844) POL-BEAR, which is (844) 765-2327, Monday to Friday, 8:00 AM to 8:00 PM Eastern Time"
          },
          {
            "kind": "paragraph",
            "text": "Privacy questions and requests: support@policybear.com"
          },
          {
            "kind": "paragraph",
            "text": "Policy Bear is an insurance agency, not an insurance company. Policies are issued by the insurance companies we represent, which are listed on our Licensing & Resources page. When you apply, the insurer also collects and uses your information under its own privacy notice, which you will receive during the application."
          }
        ]
      },
      {
        "title": "Information we collect",
        "blocks": [
          {
            "kind": "subheading",
            "text": "Information you give us"
          },
          {
            "kind": "list",
            "items": [
              "Contact details: first and last name, email address, phone number, mailing address and ZIP code.",
              "Quote details: date of birth, gender, tobacco or nicotine use, height and weight, and the coverage amount and payment frequency you choose.",
              "Application details (if you apply): Social Security number, place of birth, citizenship or residency status, answers to health questions, information about other life insurance you have, beneficiary names and relationships, and your signature.",
              "Payment details (if you buy a policy): bank routing and account number, or card details, for premium payments to the insurer.",
              "Communications: messages, emails, chat transcripts, and call recordings. Calls may be recorded, and we will tell you at the start of a recorded call."
            ]
          },
          {
            "kind": "subheading",
            "text": "Information collected automatically"
          },
          {
            "kind": "list",
            "items": [
              "Device and browser type, IP address, approximate location based on IP address, pages visited, time on page, the link or ad that brought you to us, and how you use our forms.",
              "Cookies, pixels and similar technologies (see \"Cookies and tracking\" below).",
              "Consent records: to prove you agreed to be contacted, we use consent verification services that record your visit and the consent you gave."
            ]
          },
          {
            "kind": "subheading",
            "text": "Information from others"
          },
          {
            "kind": "paragraph",
            "text": "Insurers and their underwriting partners may obtain, with your authorization, information from consumer reporting agencies, prescription drug history databases, MIB Group, Inc., motor vehicle records and public records to decide your application. These sources are described in the insurer's application authorization and its notices under the federal Fair Credit Reporting Act."
          },
          {
            "kind": "paragraph",
            "text": "Marketing partners that refer you to us with your consent."
          }
        ]
      },
      {
        "title": "How we use your information",
        "blocks": [
          {
            "kind": "list",
            "items": [
              "To give you quotes and explain coverage options.",
              "To help you complete an application and send it to the insurer.",
              "To set up premium payments and service your policy after it is issued.",
              "To contact you by phone, text and email about your quote, application or policy and, where you have consented, about other insurance products we offer.",
              "To verify your identity and prevent fraud.",
              "To meet legal, regulatory and licensing duties, including record-keeping required by state insurance departments.",
              "To improve our website, train our staff and check quality."
            ]
          },
          {
            "kind": "paragraph",
            "text": "We do not use your health information for marketing."
          }
        ]
      },
      {
        "title": "How we share your information",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We share personal information only as described here:"
          },
          {
            "kind": "list",
            "items": [
              "Insurers you apply with, so they can quote, underwrite, issue and service your policy.",
              "Service providers that work for us under contracts that require them to protect your information and use it only for our purposes: website hosting, quoting and application technology, payment processing, phone and texting systems, email delivery, consent verification, analytics and customer support.",
              "Our licensed agents, who help you by phone.",
              "Government and legal parties when required by law, subpoena, court order or regulator request, or to protect our rights, your safety or the safety of others.",
              "A buyer or successor if our business is sold or merged, under the same protections described here."
            ]
          },
          {
            "kind": "paragraph",
            "text": "We do not sell your personal information, and we do not share your contact details with other agencies or lead buyers. We do not share personal information with non-affiliated third parties for their own marketing."
          }
        ]
      },
      {
        "title": "Your consent to calls and texts",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "If you check the consent box on our form, you agree that Policy Bear and its licensed agents may call and text you at the number you gave, including with automated technology and prerecorded messages, about life insurance. Your consent applies to Policy Bear only. Consent is not a condition of buying anything."
          },
          {
            "kind": "paragraph",
            "text": "You can stop texts at any time by replying STOP. You can stop calls by telling the agent, calling (844) POL-BEAR, or emailing support@policybear.com. We honor requests promptly and within the time the law requires. We keep an internal Do Not Call list and check the National Do Not Call Registry where required. Message and data rates may apply. Message frequency varies."
          },
          {
            "kind": "paragraph",
            "text": "You can unsubscribe from marketing emails using the link in any email. We will still send messages about your application or policy."
          }
        ]
      },
      {
        "title": "Health and sensitive information",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Health answers, Social Security numbers and bank details are sensitive. We collect them only when you apply, use them only to process your application and policy, and pass them to the insurer through secure systems. We do not sell them or use them for advertising. Where state insurance privacy laws or the insurer's authorization require your written permission to disclose health information, we get it before sharing."
          }
        ]
      },
      {
        "title": "How we protect your information",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We use administrative, technical and physical safeguards suited to the sensitivity of the information, including encryption in transit, access limited to staff who need it, staff confidentiality agreements and training, and security reviews of our vendors. No system is completely secure, so we cannot guarantee absolute security. If a breach affects your information, we will notify you and regulators as the law requires."
          }
        ]
      },
      {
        "title": "How long we keep information",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We keep personal information as long as needed for the purposes above and as required by insurance record-keeping laws, which is often five years or more after a policy ends or an application closes. Consent records are kept for at least five years. We then delete or de-identify the information."
          }
        ]
      },
      {
        "title": "Cookies and tracking",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We use cookies and similar tools to make the site work, remember your progress in the quote form, measure traffic and the ads that bring visitors, and record consent. Some are set by third parties such as analytics and advertising platforms. You can block or delete cookies in your browser settings; parts of the site may not work without them. Our site does not respond to \"Do Not Track\" browser signals, but we honor the Global Privacy Control (GPC) signal as a request to opt out of targeted advertising where state law requires it."
          },
          {
            "kind": "paragraph",
            "text": "We do not pass your health answers, Social Security number or payment details to advertising or analytics platforms."
          }
        ]
      },
      {
        "title": "Your privacy rights",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Federal and state insurance privacy laws. As a financial institution under the Gramm-Leach-Bliley Act and state insurance privacy laws, we tell you about our practices, and we do not share your nonpublic personal information with non-affiliated third parties except as the law permits. Because we do not share for other purposes, there is nothing you need to opt out of under those laws."
          },
          {
            "kind": "paragraph",
            "text": "Right to access and correct. You may ask what personal information we hold about you and ask us to correct anything that is wrong. Information held by an insurer must be requested from the insurer; we will help you reach them."
          },
          {
            "kind": "paragraph",
            "text": "State consumer privacy laws. Depending on where you live, state laws may give you the right to know, access, correct, delete and get a copy of your personal information; to opt out of targeted advertising, sale or profiling; and to limit the use of sensitive information. Some information we hold for insurance purposes is exempt from these laws because insurance privacy laws cover it, but we will respond to every request and explain what applies."
          },
          {
            "kind": "paragraph",
            "text": "Nevada residents. We do not sell covered information as defined by Nevada law (NRS Chapter 603A). You may still send an opt-out request to support@policybear.com."
          },
          {
            "kind": "paragraph",
            "text": "How to make a request. Email support@policybear.com or call (844) POL-BEAR. We will verify your identity by matching information you give us with what we hold. An authorized agent may make a request for you with your signed permission. We respond within 45 days, or the period your state requires, and may extend once where the law permits. If we deny your request, you may appeal by replying to our decision with \"Appeal\" in the subject line. If you are not satisfied with the outcome, you may contact your state attorney general. We will not treat you differently for exercising your rights."
          }
        ]
      },
      {
        "title": "Children",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Our website and products are for adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has given us information, contact us and we will delete it."
          }
        ]
      },
      {
        "title": "Links to other websites",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Our site may link to insurer, regulator or resource websites. Their privacy practices are their own; please read their policies."
          }
        ]
      },
      {
        "title": "Changes to this policy",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We may update this Privacy Policy. We will post the new version with a new \"Last updated\" date and, for material changes, give notice on the website or by email. Where the law requires your consent to a change, we will ask for it."
          }
        ]
      },
      {
        "title": "Contact us",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear · 222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145 · (844) POL-BEAR · support@policybear.com"
          }
        ]
      }
    ]
  },
  "terms": {
    "title": "Terms of Service",
    "date": "Effective date: October 9, 2026 · Last updated: October 9, 2026",
    "intro": [
      "These Terms of Service (\"Terms\") are an agreement between you and Policy Bear (\"we,\" \"us\") for your use of policybear.com, our quote and application tools, and our phone, text and email services (together, the \"Services\"). Please read them carefully. The section \"Dispute resolution, arbitration and class action waiver\" contains a binding arbitration agreement and class action waiver that affect your legal rights. You may opt out as described there.",
      "By using the Services you agree to these Terms and to our Privacy Policy. If you do not agree, do not use the Services."
    ],
    "sections": [
      {
        "title": "Who we are",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is a licensed insurance agency (Nevada license 4121356, NPN 21624946) based in Las Vegas, Nevada. We help consumers compare and apply for life insurance, including final expense whole life insurance, issued by the insurance companies we represent. We are not an insurance company. We do not issue policies, make underwriting decisions or pay claims. The insurer you apply with makes those decisions under the terms of its policy."
          }
        ]
      },
      {
        "title": "Eligibility",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "To use the Services you must be at least 18 years old, live in a state where we are licensed (listed on our Licensing & Resources page), and be able to enter into a binding contract. Final expense products have minimum and maximum issue ages that depend on the insurer, the product and your state. You may only submit information about yourself, or about another person with that person's knowledge and permission."
          }
        ]
      },
      {
        "title": "Quotes are estimates",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Prices shown on the website are estimates based on the information you give and the insurer's published rates. A quote is not an offer of coverage, a policy, or a guarantee of approval or price. Your final premium, coverage type and eligibility are set by the insurer after it reviews your full application, and may differ from the quote."
          }
        ]
      },
      {
        "title": "No coverage until the policy is issued",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Submitting a quote request or an application does not create insurance coverage. Coverage begins only when the insurer approves your application, issues the policy, and any conditions in the policy, such as receipt of the first premium, are met. Until the insurer confirms your coverage, do not cancel any existing insurance."
          }
        ]
      },
      {
        "title": "Your responsibilities",
        "blocks": [
          {
            "kind": "list",
            "items": [
              "Give complete, truthful and current information. Incomplete or untrue answers on an insurance application can lead the insurer to deny a claim or cancel the policy, and may be insurance fraud under state law.",
              "Read your application, policy and disclosures before signing.",
              "Keep your contact and payment details up to date.",
              "Use the Services only for lawful, personal purposes. Do not submit information about another person without permission, use automated tools to scrape or flood our forms, try to break or bypass security, or interfere with the Services."
            ]
          }
        ]
      },
      {
        "title": "Electronic signatures and records",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "You agree that we and the insurer may provide applications, disclosures, notices, policies and other records to you electronically, and that you may sign them electronically, under the federal ESIGN Act and state electronic transaction laws. Your electronic signature has the same effect as a handwritten one. To view records you need a device with internet access, a current web browser and a PDF reader. You may ask for paper copies at no charge, or withdraw your consent to electronic records, by calling (844) POL-BEAR or emailing support@policybear.com. Withdrawing consent may slow the processing of an application. Please keep your email address current."
          }
        ]
      },
      {
        "title": "Calls, texts and emails",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "If you give consent on our form, you agree to be contacted as described in our Privacy Policy under \"Your consent to calls and texts.\" Consent is not required to buy any product. You can opt out at any time by replying STOP to texts, telling an agent, or contacting us. Calls with our agents may be recorded for quality, training and compliance, and we will tell you at the start of a recorded call."
          }
        ]
      },
      {
        "title": "Payments",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "If you buy a policy, premiums are paid to the insurer, not to Policy Bear, using the payment method and draft date you authorize. Policy Bear does not charge you a fee for using the Services. The insurer pays us a commission when a policy is issued (see the Final Expense Insurance Disclosure)."
          }
        ]
      },
      {
        "title": "Information on the website",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We work to keep website content accurate and current, but product features, rates and availability change and vary by state. If anything on our website differs from the policy the insurer issues, the policy controls. Website content is general information and is not legal, tax, medical or financial advice."
          }
        ]
      },
      {
        "title": "Third-party services and links",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "The Services may use or link to third parties, such as insurers, quoting and application platforms, payment processors and government resources. We are not responsible for their content, availability or practices, and your use of them may be subject to their own terms."
          }
        ]
      },
      {
        "title": "Intellectual property",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "The website, its design, text, graphics, logos and software belong to Policy Bear or its licensors and are protected by law. You may view and print pages for your personal use. You may not copy, modify, distribute or create works from them without our written permission. \"Policy Bear\" and our logo are our trademarks."
          }
        ]
      },
      {
        "title": "Disclaimer of warranties",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "To the fullest extent the law permits, the Services are provided \"as is\" and \"as available,\" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not promise that the Services will be uninterrupted, error-free or free of harmful code. This does not limit any duty we owe you as a licensed insurance agency under insurance law."
          }
        ]
      },
      {
        "title": "Limitation of liability",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "To the fullest extent the law permits, Policy Bear and its owners, employees, agents and service providers will not be liable for any indirect, incidental, special, consequential or punitive damages, or for lost profits or data, arising from your use of the Services. Our total liability for any claim relating to the Services is limited to one hundred U.S. dollars ($100). Some states do not allow these limits, so they may not apply to you. Nothing in these Terms limits liability that the law does not allow to be limited, including for fraud, gross negligence or willful misconduct, or any rights you have under your insurance policy or state insurance law."
          }
        ]
      },
      {
        "title": "Dispute resolution, arbitration and class action waiver",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Informal resolution first. Before filing a claim, please contact us at support@policybear.com or (844) POL-BEAR and describe the problem. We will try in good faith to resolve it within 60 days."
          },
          {
            "kind": "paragraph",
            "text": "Agreement to arbitrate. If we cannot resolve a dispute, you and Policy Bear agree that any dispute arising from or relating to these Terms or the Services will be decided by binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, instead of in court. The arbitration may be held by video or phone, or in the county where you live. Policy Bear will pay the filing, administrative and arbitrator fees beyond any amount you would pay to file in court. The arbitrator may award the same individual relief a court could."
          },
          {
            "kind": "paragraph",
            "text": "Exceptions. Either party may bring an individual claim in small claims court. This agreement does not apply to claims under an insurance policy, which are governed by the policy and the insurer; to complaints you file with a state department of insurance or other regulator; or to anything the law does not allow to be arbitrated."
          },
          {
            "kind": "paragraph",
            "text": "Class action waiver. Disputes will be resolved only on an individual basis. You and Policy Bear waive the right to bring or join a class, collective or representative action, and the arbitrator may not combine the claims of more than one person."
          },
          {
            "kind": "paragraph",
            "text": "Your right to opt out. You may reject this arbitration agreement by emailing support@policybear.com, or by mail to 222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145, within 30 days after you first use the Services. Include your name, your phone number and a statement that you opt out of arbitration. Opting out does not affect any other part of these Terms."
          },
          {
            "kind": "paragraph",
            "text": "If the class action waiver is found unenforceable for a claim, that claim will go to court and not to arbitration."
          }
        ]
      },
      {
        "title": "Governing law and venue",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "These Terms are governed by the laws of the State of Nevada and applicable federal law, including the Federal Arbitration Act, without regard to conflict-of-law rules. Where these Terms allow a court case, it will be brought in the state or federal courts in Clark County, Nevada, unless the law of your state gives you the right to sue where you live. The insurance laws of your state still apply to any insurance you buy."
          }
        ]
      },
      {
        "title": "Indemnity",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "You agree to cover any loss or cost, including reasonable attorneys' fees, that we incur because you knowingly submitted false information, misused the Services, or broke these Terms, except where the law does not allow this."
          }
        ]
      },
      {
        "title": "Changes, suspension and termination",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We may change, suspend or stop any part of the Services at any time. We may update these Terms; the new version applies from its \"Last updated\" date, and we will give notice of material changes. Changes do not apply to disputes already pending. If you keep using the Services after a change, you accept it."
          }
        ]
      },
      {
        "title": "General",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "These Terms, the Privacy Policy and the other pages they mention are the whole agreement about the Services. If any part is found unenforceable, the rest stays in effect. If we do not enforce a term, that is not a waiver. You may not transfer these Terms; we may transfer them as part of a merger or sale. Headings are for convenience only."
          }
        ]
      },
      {
        "title": "Contact",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear · 222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145 · (844) POL-BEAR · support@policybear.com"
          }
        ]
      }
    ]
  },
  "disclaimer": {
    "title": "Disclaimer",
    "date": "Effective date: October 9, 2026",
    "intro": [
      "Please read this Disclaimer before using policybear.com. It explains what our website and services are, and what they are not."
    ],
    "sections": [
      {
        "title": "We are a licensed insurance agency, not an insurer",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is a licensed insurance agency (Nevada license 4121356, NPN 21624946). We represent the insurance companies listed on our Licensing & Resources page and help you apply for their policies. We do not issue insurance, decide applications or pay claims. All coverage decisions, policy terms and claim payments are made by the insurance company that issues your policy."
          }
        ]
      },
      {
        "title": "Not affiliated with any government agency",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is not connected with, endorsed by or sponsored by the U.S. government, the federal Medicare program, Medicaid, the Social Security Administration, the Department of Veterans Affairs, or any state government agency. Final expense life insurance is a private insurance product. It is not a government benefit and is not part of Medicare or Social Security."
          }
        ]
      },
      {
        "title": "Quotes and prices are not guaranteed",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Any price, coverage amount or savings shown on this website is an estimate based on the information you enter and the insurer's rates at the time. Your actual premium and eligibility are decided by the insurer after it reviews your full application, including your health answers and any records it checks. Rates and products may change without notice and are not available in every state."
          }
        ]
      },
      {
        "title": "Not all applicants qualify",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Approval is not guaranteed unless the insurer describes a product as \"guaranteed issue,\" and even guaranteed issue products have age and state limits. Depending on your health answers, an insurer may offer immediate (level) coverage, graded or modified coverage with a waiting period, or decline the application."
          }
        ]
      },
      {
        "title": "Information only, not professional advice",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Articles, calculators, examples and other content on this website are general information. They are not legal, tax, financial, medical or estate-planning advice. Funeral and final expense cost figures are national averages from published sources and may not reflect costs where you live. Talk to a qualified professional about your own situation. Our licensed agents can explain insurance products, but they do not give tax or legal advice."
          }
        ]
      },
      {
        "title": "Examples and testimonials",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Examples of premiums or benefits are for illustration only and are not a promise of what you will pay or receive. Customer stories shown on the site are from real customers, shared with their permission; their experience may not be typical, and your results depend on your age, health, state and the product you choose."
          }
        ]
      },
      {
        "title": "The policy controls",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "This website summarizes product features in plain language. Only the insurance policy issued to you contains the full terms, conditions, limitations and exclusions. If anything on the website differs from your policy, the policy controls. Please read your policy carefully when you receive it."
          }
        ]
      },
      {
        "title": "Limited product offering",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We offer products from a limited number of insurers. We do not offer every plan available in your area, and other insurers or agents may offer products with different features or prices. You are free to compare. Your state department of insurance and the National Association of Insurance Commissioners (NAIC) publish free information to help you compare."
          }
        ]
      },
      {
        "title": "Website availability and accuracy",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We try to keep the website accurate and available but do not guarantee that it is error-free, complete, current or uninterrupted. We may correct errors and change content at any time."
          }
        ]
      },
      {
        "title": "Third-party links",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Links to insurers, regulators and other websites are provided for convenience. We do not control and are not responsible for their content or privacy practices."
          }
        ]
      },
      {
        "title": "Questions",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Call (844) POL-BEAR (Monday to Friday, 8:00 AM to 8:00 PM Eastern Time) or email support@policybear.com. You can also verify our license through your state department of insurance (see Licensing & Resources)."
          }
        ]
      }
    ]
  },
  "licensing": {
    "title": "Licensing & Resources",
    "date": "Last updated: October 9, 2026",
    "intro": [
      "Policy Bear sells insurance only in states where the agency and the agent helping you hold an active license. This page lists our licenses and gives you free, independent resources to check our licensing, learn about final expense insurance, and get help if you have a concern."
    ],
    "sections": [
      {
        "title": "Agency information",
        "blocks": [
          {
            "kind": "details",
            "rows": [
              [
                "Agency name",
                "Policy Bear"
              ],
              [
                "Resident state",
                "Nevada"
              ],
              [
                "Nevada agency license number",
                "4121356 (Active)"
              ],
              [
                "Lines of authority",
                "Life and Health"
              ],
              [
                "Agency National Producer Number (NPN)",
                "21624946"
              ],
              [
                "Principal office",
                "222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145"
              ],
              [
                "Phone",
                "(844) POL-BEAR / (844) 765-2327"
              ],
              [
                "Hours",
                "Monday to Friday, 8:00 AM to 8:00 PM Eastern Time"
              ],
              [
                "Email",
                "support@policybear.com"
              ]
            ]
          }
        ]
      },
      {
        "title": "States where we are licensed",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is licensed as a resident agency in Nevada and as a non-resident agency in the 30 states and the District of Columbia below. We do not sell insurance in states that are not listed. Our license number for your state is available on request, and you can confirm it any time with your state department of insurance."
          },
          {
            "kind": "grid",
            "items": [
              "Alabama",
              "Alaska",
              "Arizona",
              "Colorado",
              "Delaware",
              "District of Columbia",
              "Georgia",
              "Idaho",
              "Illinois",
              "Indiana",
              "Iowa",
              "Kansas",
              "Louisiana",
              "Maine",
              "Maryland",
              "Michigan",
              "Minnesota",
              "Missouri",
              "Montana",
              "New Jersey",
              "North Dakota",
              "Ohio",
              "Oklahoma",
              "Pennsylvania",
              "Rhode Island",
              "South Dakota",
              "Tennessee",
              "Texas",
              "Utah",
              "Virginia",
              "Wyoming"
            ]
          }
        ]
      },
      {
        "title": "Our licensed agents",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Every person who discusses or sells insurance for Policy Bear is an individually licensed life insurance agent in your state. Agents will give you their name and license number at the start of any call, or whenever you ask. You can look up any agent's license using their National Producer Number (see \"How to verify a license\" below)."
          }
        ]
      },
      {
        "title": "Insurance companies we represent",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is appointed with the following insurers to offer their final expense and related life insurance products. Each insurer is responsible for its own policies and claims. Not every insurer or product is available in every state."
          },
          {
            "kind": "grid",
            "items": [
              "Mutual of Omaha",
              "Transamerica",
              "Foresters Financial",
              "Aflac",
              "American Amicable",
              "Corebridge Financial",
              "Liberty Bankers Life",
              "Fidelity Life",
              "Royal Neighbors of America",
              "American Home Life"
            ]
          },
          {
            "kind": "paragraph",
            "text": "Brand names and logos belong to their owners and are used only to identify the insurers we represent. You can check any insurer's license and financial standing with your state department of insurance and with independent rating agencies such as AM Best."
          }
        ]
      },
      {
        "title": "How to verify a license",
        "blocks": [
          {
            "kind": "ordered",
            "items": [
              "Go to your state's department of insurance. The NAIC keeps a directory of every state insurance department at content.naic.org/state-insurance-departments.",
              "Search for \"Policy Bear\" or our agency NPN 21624946.",
              "You can also look up any agent nationwide through the National Insurance Producer Registry (NIPR) at nipr.com."
            ]
          }
        ]
      },
      {
        "title": "Consumer resources",
        "blocks": [
          {
            "kind": "list",
            "items": [
              "National Association of Insurance Commissioners (NAIC): plain-language guides on life insurance, including the NAIC Life Insurance Buyer's Guide, at content.naic.org.",
              "NAIC Life Insurance Policy Locator: a free service to help families find a lost life insurance policy of a loved one who has died, at content.naic.org.",
              "Your state's life and health insurance guaranty association: provides limited protection to policyholders if an insurer becomes insolvent. Find yours through the National Organization of Life & Health Insurance Guaranty Associations at nolhga.com.",
              "Federal Trade Commission, Funeral Rule: explains your right to itemized prices from funeral homes, at consumer.ftc.gov.",
              "MIB Group, Inc.: you have the right to request a free copy of any MIB consumer file about you, at mib.com.",
              "Nevada Division of Insurance: our home-state regulator, at doi.nv.gov."
            ]
          }
        ]
      },
      {
        "title": "Questions or complaints",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We want to fix any problem quickly. Please contact us first:"
          },
          {
            "kind": "list",
            "items": [
              "Phone: (844) POL-BEAR, Monday to Friday, 8:00 AM to 8:00 PM Eastern Time",
              "Email: support@policybear.com",
              "Mail: Policy Bear, Attn: Compliance, 222 S. Rainbow Boulevard, Suite 216, Las Vegas, NV 89145"
            ]
          },
          {
            "kind": "paragraph",
            "text": "We will acknowledge your complaint within 5 business days and aim to resolve it within 30 days."
          },
          {
            "kind": "paragraph",
            "text": "You also have the right to contact your state department of insurance at any time, without contacting us first. For questions about a policy or claim, you may also contact the insurer directly using the phone number on your policy."
          }
        ]
      },
      {
        "title": "Agency compensation",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear is paid a commission by the insurer when a policy is issued and while it stays in force. You do not pay us a separate fee, and your premium is set by the insurer. You may ask your agent about compensation at any time."
          }
        ]
      }
    ]
  },
  "disclosure": {
    "title": "Final Expense Insurance Disclosure",
    "date": "Last updated: October 9, 2026",
    "intro": [
      "Please read this disclosure before you apply. It explains, in plain language, how final expense life insurance works and what to consider. It is a summary only. The policy issued by the insurance company contains the full terms, benefits, limitations and exclusions, and it controls. Features vary by insurer, product and state."
    ],
    "sections": [
      {
        "title": "What final expense insurance is",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Final expense insurance, also called burial or funeral insurance, is a small whole life insurance policy for older adults. Coverage amounts and issue ages depend on the insurer and product; the amounts available to you are shown on your quote and your policy. When the insured person dies while the policy is in force, the insurer pays the death benefit to the beneficiary named on the policy. The beneficiary can use the money for any purpose, such as funeral costs, medical bills or debts. It is not paid to a funeral home unless you name the funeral home as beneficiary or assign the policy to it."
          },
          {
            "kind": "paragraph",
            "text": "It is private insurance. It is not a government program, and it is not affiliated with Medicare, Medicaid, Social Security or the VA."
          }
        ]
      },
      {
        "title": "Key features",
        "blocks": [
          {
            "kind": "list",
            "items": [
              "Lifelong coverage: coverage lasts your whole life as long as you pay the premiums when due.",
              "Level premiums: your premium is set when the policy is issued and, for most final expense policies, is guaranteed not to increase. Check your policy for the exact guarantee.",
              "Level death benefit: the coverage amount does not decrease as you age, except as reduced by any outstanding policy loan.",
              "No medical exam: most policies use health questions and record checks instead of an exam.",
              "Cash value: whole life policies may build a small cash value over time. It grows slowly and is often small in the early years, and any loan or surrender reduces or ends the death benefit."
            ]
          }
        ]
      },
      {
        "title": "Types of coverage and waiting periods",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Based on your answers, the insurer may offer one of these coverage types. The plan you are offered is shown in your decision and in your policy."
          },
          {
            "kind": "table",
            "headers": [
              "Coverage type",
              "Who it's for",
              "If death is from natural causes",
              "If death is accidental"
            ],
            "rows": [
              [
                "Immediate (level) benefit",
                "Applicants who qualify based on their health answers",
                "Full benefit from the policy date",
                "Full benefit from the policy date"
              ],
              [
                "Graded or modified benefit",
                "Applicants with certain health conditions",
                "A reduced benefit during a waiting period, usually the first 2 years; full benefit after that",
                "Full benefit from the policy date"
              ],
              [
                "Guaranteed issue",
                "Applicants who don't qualify for other plans; no health questions",
                "During a waiting period, usually the first 2 years, a return of premiums paid plus interest; full benefit after that",
                "Full benefit from the policy date"
              ]
            ]
          },
          {
            "kind": "paragraph",
            "text": "Graded and guaranteed issue plans usually cost more per $1,000 of coverage than immediate benefit plans. The exact waiting period and the benefit paid during it are set by each insurer and are shown in your policy."
          }
        ]
      },
      {
        "title": "Your answers must be accurate",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "The insurer relies on the answers in your application. If any answer is incomplete or untrue, the insurer may deny a claim, reduce the benefit or rescind (cancel) the policy, especially during the first two years, known as the \"contestability period.\" Knowingly giving false information to an insurer is a crime in many states. If you are unsure how to answer a question, ask your agent before you sign."
          },
          {
            "kind": "paragraph",
            "text": "To decide your application, the insurer may, with your authorization, check your prescription drug history, MIB Group records, motor vehicle records and public records. These checks are explained in the application's authorization form."
          }
        ]
      },
      {
        "title": "Free-look period: your right to cancel",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "After you receive your policy, you have a free-look period of at least 10 days, and often 30 days, depending on your state, your age and the insurer; many states require 30 days for older applicants and for replacement policies. If you return the policy during that time, it is cancelled as if it never existed and you receive a full refund of any premium paid. Instructions are on the cover page of your policy."
          }
        ]
      },
      {
        "title": "Paying premiums and lapse",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Premiums are paid to the insurer, usually by automatic bank draft on the date you choose, or by another method the insurer accepts."
          },
          {
            "kind": "paragraph",
            "text": "If a premium is not paid, the policy enters a grace period, usually 31 days. Coverage continues during the grace period."
          },
          {
            "kind": "paragraph",
            "text": "If the premium is still unpaid when the grace period ends, the policy may lapse and coverage will end. Some policies offer non-forfeiture options or reinstatement; reinstatement may require new health answers and payment of past-due premiums."
          },
          {
            "kind": "paragraph",
            "text": "Over many years, the total premiums you pay may be more than the death benefit. Consider your budget and how long you expect to pay."
          },
          {
            "kind": "paragraph",
            "text": "Many states let you name a third party, such as a family member or friend, to be notified if your policy is about to lapse. Ask us how to set this up."
          }
        ]
      },
      {
        "title": "Replacing existing coverage",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Cancelling an existing life insurance policy or annuity to buy a new one is called a replacement and may not be in your interest. A new policy may have a new waiting period and contestability period, and higher premiums because you are older, and you could lose cash value or benefits from your current policy. Do not cancel any existing coverage until your new policy is issued and you have reviewed it. If you are replacing coverage, your state requires us to give you a replacement notice, and you may get a longer free-look period."
          }
        ]
      },
      {
        "title": "What final expense insurance does not do",
        "blocks": [
          {
            "kind": "list",
            "items": [
              "It does not provide health, long-term care or Medicare coverage.",
              "It does not pre-arrange or pay a specific funeral home unless you choose to assign the benefit.",
              "It is not an investment or savings plan.",
              "Policy loans, if available, accrue interest and reduce the death benefit."
            ]
          }
        ]
      },
      {
        "title": "Taxes",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Life insurance death benefits are generally received income-tax-free by beneficiaries under federal law, but there can be exceptions. Policy Bear and its agents do not give tax advice. Ask a tax professional about your situation."
          }
        ]
      },
      {
        "title": "How we are paid",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Policy Bear and its agents receive commissions from the insurer when a policy is issued, and may receive renewal commissions while it stays in force. Commission amounts can differ between insurers and products. You do not pay us a fee. You may ask your agent about compensation at any time."
          }
        ]
      },
      {
        "title": "Limited choice of insurers",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "We represent a limited number of insurers, listed on our Licensing & Resources page. We do not offer every final expense policy available in your state, and you are encouraged to compare."
          }
        ]
      },
      {
        "title": "Who issues your policy",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Your policy is issued by the insurance company named on your application and policy, under its policy forms, which vary by state. Products and features may not be available in all states. Coverage is subject to the insurer's underwriting and the terms of the policy."
          }
        ]
      },
      {
        "title": "Questions",
        "blocks": [
          {
            "kind": "paragraph",
            "text": "Call a licensed Policy Bear agent at (844) POL-BEAR, Monday to Friday, 8:00 AM to 8:00 PM Eastern Time, or email support@policybear.com. You can also contact your state department of insurance (see Licensing & Resources)."
          }
        ]
      }
    ]
  }
}

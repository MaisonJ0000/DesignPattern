import { CheckUrls } from "./checkUrl";
import { CheckUrlsGen } from "./checkUrlByGenerator";

async function main () {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com',
  ])

  for await (const status of checkUrls) {
    console.log('[JONGMAN_LOG] status', status, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }

  const checkUrls2 = new CheckUrlsGen([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com',
  ])

  for await (const status of checkUrls2) {
    console.log('[JONGMAN_LOG] status', status, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }


}

main();

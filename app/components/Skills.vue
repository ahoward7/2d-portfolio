<template>
  <div class="flex flex-col gap-1 lg:gap-2">
    <div class="text-[10px] lg:text-base">
      {{ `<div class="flex flex-col gap-1>` }}
    </div>
    <div class="flex flex-col gap-1 text-xs md:text-base xl:text-lg pl-2 lg:pl-7 p-1 lg:p-2">
      <CodeComment>// Skills</CodeComment>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"JavaScript"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"TypeScript"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"Vue.js"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"Nuxt.js"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"CSS3"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"TailwindCSS"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"Git"</CodeString></span>
      <span><CodePunctuation>- </CodePunctuation><CodeString>"Mongo DB"</CodeString></span>
    </div>
    <div class="text-[10px] lg:text-base">
      {{ `</div>` }}
    </div>
  </div>
</template>
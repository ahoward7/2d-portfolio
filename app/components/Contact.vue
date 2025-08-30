<template>
  <div class="flex flex-col gap-1 lg:gap-2">
    <div class="text-xs lg:text-base">
      {{ `<div class="flex flex-col gap-1>` }}
    </div>
    <div class="flex flex-col gap-1 text-sm md:text-base xl:text-lg pl-2 lg:pl-7 p-1 lg:p-2">
      <CodeComment>// Contact Me</CodeComment>
      <span><CodeKeyword>const </CodeKeyword><CodeVariable>contactInfo</CodeVariable><CodeOperator> = </CodeOperator><CodePunctuation>{</CodePunctuation></span>
      <div class="flex flex-col gap-1 pl-2 lg:pl-4">
        <span><CodeProperty>linkedIn</CodeProperty><CodePunctuation>: </CodePunctuation><CodeLink url="https://www.linkedin.com/in/avery-howard/">linkedin/avery-howard</CodeLink><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>github</CodeProperty><CodePunctuation>: </CodePunctuation><CodeLink url="https://github.com/ahoward7/">github/ahoward7</CodeLink><CodePunctuation>,</CodePunctuation></span>
      </div>
      <span><CodePunctuation>}</CodePunctuation></span>
    </div>
    <div class="text-xs lg:text-base">
      {{ `</div>` }}
    </div>
  </div>
</template>
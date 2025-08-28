<template>
  <div class="flex flex-col gap-2">
    <div>{{ `<div class="flex flex-col gap-1 text-lg p-2">` }}</div>
    <div class="flex flex-col gap-1 text-lg pl-7 p-2">
      <CodeComment>// Education</CodeComment>
      <span><CodeKeyword>const </CodeKeyword><CodeVariable>cedarvilleUniversity</CodeVariable><CodeOperator> = </CodeOperator><CodePunctuation>{</CodePunctuation></span>
      <div class="flex flex-col gap-1 pl-4">
        <span><CodeProperty>schoolName</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"Cedarville University"</CodeString><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>startYear</CodeProperty><CodePunctuation>: </CodePunctuation><CodeNumber>2019</CodeNumber><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>endYear</CodeProperty><CodePunctuation>: </CodePunctuation><CodeNumber>2022</CodeNumber><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>degree</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"Bachelor's of Computer Science"</CodeString><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>awards</CodeProperty><CodePunctuation>: </CodePunctuation><CodePunctuation>[</CodePunctuation><CodeString>"Excellence In User Experience Award"</CodeString><CodePunctuation>]</CodePunctuation><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>funFact</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"Submitted coding assignment not due for 3 weeks on day presented in class."</CodeString></span>
      </div>
      <span><CodePunctuation>}</CodePunctuation></span>
      <div class="h-6" />
      <span><CodeKeyword>const </CodeKeyword><CodeVariable>corningCommunityCollege</CodeVariable><CodeOperator> = </CodeOperator><CodePunctuation>{</CodePunctuation></span>
      <div class="flex flex-col gap-1 pl-4">
        <span><CodeProperty>schoolName</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"Corning Community College"</CodeString><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>startYear</CodeProperty><CodePunctuation>: </CodePunctuation><CodeNumber>2018</CodeNumber><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>endYear</CodeProperty><CodePunctuation>: </CodePunctuation><CodeNumber>2019</CodeNumber><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>degree</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"No degree - Majoring in Computer Science"</CodeString><CodePunctuation>,</CodePunctuation></span>
        <span><CodeProperty>funFact</CodeProperty><CodePunctuation>: </CodePunctuation><CodeString>"Attended this school at just 16 years old"</CodeString></span>
      </div>
      <span><CodePunctuation>}</CodePunctuation></span>
    </div>
    <div>{{ `</div>` }}</div>
  </div>
</template>
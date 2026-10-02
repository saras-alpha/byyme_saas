import os
from dotenv import load_dotenv

from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineParams, PipelineTask

# Provider imports depend on the versions/providers you install.

load_dotenv()


async def run_bot(transport):

    # STT
    stt = ...

    # LLM
    llm = ...

    # TTS
    tts = ...

    pipeline = Pipeline(
        [
            transport.input(),
            stt,
            llm,
            tts,
            transport.output(),
        ]
    )

    task = PipelineTask(
        pipeline,
        params=PipelineParams(
            enable_metrics=True,
        ),
    )

    runner = PipelineRunner()

    await runner.run(task)
